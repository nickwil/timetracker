import { types, onSnapshot } from "mobx-state-tree";
import { date } from "../util/quick.js";
const moment = require("moment");

const uuidv1 = require("uuid/v1");

const Item = types
  .model("Item", {
    created: types.Date,
    tilCompletion: types.number,
    completed: types.boolean,
    length: types.number,
    day: types.string,
    text: types.string,
    tagId: types.string,
    id: types.string
  })
  .actions(self => ({
    toggle() {
      self.completed = !self.completed;
    },
    updateText(text) {
      self.text = text;
    },

    updateTimeTilCompletion(timeSpent) {
      self.tilCompletion = self.tilCompletion - timeSpent;
      if (self.tilCompletion <= 0) {
        self.completed = true;
        // add any extra time to the time the task took
        const newTime = self.length  - self.tilCompletion
        self.tilCompletion = newTime
        self.length = newTime
      }
    },
    updateTag(tag) {
      self.tagId = tag;
    },

    updateLengthOfTask(newLength) {
      self.length = newLength;
      self.tilCompletion = newLength;
    }
  }));

const ItemStore = types
  .model("ItemStore", {
    items: types.array(Item),
    currentDay: types.integer
  })
  .views(self => ({
    // completed todos from the current day
    get completedTodos() {
      return self.items.filter(
        obj =>
          obj.day == date(new Date(self.currentDay)) && obj.completed == true
      );
    },
    get allCompletedTodos() {
      return self.items.filter(obj => obj.completed == true);
    },
    get years() {
      var years = [];
      self.items.map(function(item) {
        const year = item.day.split("/")[0];
        if (!years.includes(year)) {
          years.push(year);
        }
      });
      return years;
    },
    get months() {
      var months = [];
      self.items.map(function(item) {
        const day = item.day.split("/");
        const month = day[0] + "/" + day[1];
        if (!months.includes(month)) {
          months.push(month);
        }
      });
      return months;
    },
    get weeks() {
      var weeks = [];
      self.items.map(function(item) {
        const day = item.day.split("/");
        const week =
          day[0] +
          "/" +
          day[1] +
          "/" +
          Math.ceil(moment(item.day, "YYYY/MM/DD").date() / 7);

        if (!weeks.includes(week)) {
          weeks.push(week);
        }
      });
      return weeks;
    },
    get unCompletedTodos() {
      return self.items.filter(
        obj =>
          obj.day == date(new Date(self.currentDay)) && obj.completed == false
      );
    },
    get exportItemsData() {
      var data = "";
      self.items.map((obj, index) => {
        data += `#${index + 1} 
• text: ${obj.text} 
• created: ${obj.created.getTime()} 
• tilCompletion: ${obj.tilCompletion} 
• day: ${obj.day} 
• completed: ${obj.completed} 
• length: ${obj.length} 
• tagId: ${obj.tagId} 
• id: ${obj.id}
`;
      });
      return data;
    },
    importItemsData(data) {
      var dataSplit = data.split("#");
      var items = [];
      var finalItems = [];
      dataSplit.map((obj, index) =>
        items.push({
          number: index,
          item: obj.split("•")
        })
      );
      for (var i = 0; i < items.length; i++) {
        // for property in items str.replace(/\s/g, '') remove whitespace
        var item = {};
        for (var property in items[i].item) {
          var text = items[i].item[property].trim();

          const splitText = text.split(":");
          if (splitText.length > 1) {
            item[splitText[0]] = splitText[1].trim();
          }
        }
        if (
          item.created &&
          item.length &&
          item.tilCompletion &&
          item.completed
        ) {
          // set types correctly
        }
        if (item.created) {
          // set types correctly
          item.created = new Date(Number(item.created));
          item.length = Number(item.length);
          item.tilCompletion = Number(item.tilCompletion);
          item.completed = item.completed == "true" ? true : false;
          finalItems.push(item);
        }
      }
      return finalItems;
    },
    completedTodosFromWeek(year, month, weekNo) {
      const completedTodos = self.items.filter(
        obj => obj.day.includes(`${year}/${month}`) && obj.completed == true
      );
      // check if day is in a week
      return completedTodos.filter(
        obj => Math.ceil(moment(obj.day, "YYYY/MM/DD").date() / 7) == weekNo
      );
    },
    completedTodosFromMonth(year, month) {
      return self.items.filter(
        obj => obj.day.includes(`${year}/${month}`) && obj.completed == true
      );
    },
    completedTodosFromYear(year) {
      return self.items.filter(
        obj => obj.day.includes(`${year}`) && obj.completed == true
      );
    },
    index(id) {
      return self.items.findIndex(obj => obj.id == id);
    },

    getTimeFromEachTag(tags, completedTodos = self.allCompletedTodos) {
      const items = completedTodos;
      var tagsTime = [];
      tags.map(tag =>
        tagsTime.push({
          title: tag.name,
          id: tag.id,
          color: tag.color,
          value: 0
        })
      );

      for (var itemNo = 0; itemNo < items.length; itemNo++) {
        const item = items[itemNo];
        const tagIndex = tagsTime.findIndex(obj => obj.id == item.tagId);
        var tag = tagsTime[tagIndex];
        tag.value += item.length;
      }
      return tagsTime;
    }
  }))
  .actions(self => ({
    addItem(text, length, tag = "Other", title = "", completed = false) {
      self.items.push({
        created: Date.now(),
        tilCompletion: length,
        length: length,
        day: date(new Date(self.currentDay)),
        tagId: tag,
        text: text,
        title: title,
        completed: completed,
        id: uuidv1()
      });
    },
    deleteItem(id) {
      self.items = self.items.filter(item => item.id != id);
    },
    updateDate(date) {
      if(!isNaN(new Date(date).getTime())){
        self.currentDay = date;
      }
      
    },
    setEmptyTagIdToDefault(id) {
      for (var itemNumber = 0; itemNumber < self.items.length; itemNumber++) {
        const item = self.items[itemNumber];
        if (item.tagId == id) {
          item.tagId = "Other";
        }
      }
    },
    // need to move to views
    getTimeToSpendForDay(day = moment(self.currentDay).format("YYYY/MM/DD")) {
      const dailyItems = self.items.filter(item => {
        return item.day == day;
      });
      var time = 0;
      dailyItems.map(item => (time += item.tilCompletion));
      return time;
    },
    setItems(items) {
      self.items = items;
    }
  }));

// create an instance from a snapshot
const store = ItemStore.create({
  items: [
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: "2019/07/06",
      text: "Study for accounting",
      tagId: "Home",
      id: uuidv1()
    },
    {
      created: Date.now(),
      tilCompletion: 5,
      completed: false,
      length: 5,
      day: date(),
      text: "Study for accounting",
      tagId: "Home",
      id: "1"
    },
    {
      created: Date.now(),
      tilCompletion: 13,
      completed: true,
      length: 13,
      day: date(),
      text: "Study",
      tagId: "Home",
      id: uuidv1()
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: date(),
      text: "Work",
      tagId: "Other",
      id: uuidv1()
    }
  ],
  currentDay: new Date().getTime()
});

const Time = types
  .model("Time", {
    // its date cuz id is date
    selectedItem: types.maybe(types.string),
    isCounting: types.boolean,
    count: types.integer
  })
  .actions(self => ({
    reverseCounting(id = undefined) {
      self.selectedItem = id;
      self.isCounting = !self.isCounting;
    },
    resetCount() {
      self.count = 0;
    },
    setTimeToItem(itemStore = store) {

      if (self.selectedItem) {
        itemStore.items[itemStore.index(self.selectedItem)].updateTimeTilCompletion(
          self.count
        );
        self.selectedItem = undefined;
      } else {
        itemStore.addItem("", self.count, "Other", "", true);
      }
      localStorage.removeItem("timer")
    },
    incrementCount() {
      self.count += 1;
      const infoToContinue = {
        selectedItem: self.selectedItem,
        count: self.count,
        oldTime: new Date().getTime()
      }
      localStorage.setItem("timer", JSON.stringify(infoToContinue))
    }
  }));
var timeStore;
if(localStorage.getItem("timer") == null){
 timeStore = Time.create({
  selectedItem: undefined,
  isCounting: false,
  count: 0
});
}
else {
  const data = JSON.parse(localStorage.getItem("timer"))
  timeStore = Time.create({
    selectedItem: data.selectedItem,
    isCounting: true,
    count: data.count + Math.round(((new Date().getTime() - data.oldTime) /1000))
  });
}
export { timeStore, ItemStore, Time };
export default store;
