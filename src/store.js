import { types, onSnapshot } from "mobx-state-tree"
import {date} from "./util/quick.js"
const moment = require("moment")

const uuidv1 = require('uuid/v1');

const Item = types
    .model("Item", {
        
      created: types.Date,
      tilCompletion: types.number,
      completed: types.boolean,
      length: types.number,
      day: types.string,
      text: types.string,
      tagId: types.string,
      // temp id creation
      id: types.string /*shoukd be a string*/,
    
    })
    .actions(self => ({
        toggle() {
            self.completed = !self.completed
        },
         updateText(text) {
            self.text = text
      },

      updateTimeTilCompletion (timeSpent) {
        self.tilCompletion = self.tilCompletion - timeSpent
        if(self.tilCompletion < 0){
          self.completed = true
          self.tilCompletion = self.length
        }
        },
        updateTag(tag){
            self.tagId = tag
        },

        updateLengthOfTask(newLength){
          self.length = newLength
          self.tilCompletion = newLength 
        }

    }))

const ItemStore = types
    .model("ItemStore", {
        items: types.array(Item),
        currentDay: types.integer,
    })
    .views(self => ({
      
            get completedTodos() {
                return self.items.filter(obj=> obj.day == date(new Date(self.currentDay)) && obj.completed == true)
            },
            get unCompletedTodos(){
                return self.items.filter(obj=> obj.day == date(new Date(self.currentDay)) && obj.completed == false)
            },
            index(id){
                return self.items.findIndex(obj => obj.id == id)
            },
        
    }))
    .actions(self => ({

        addItem(text, length, tag='Other', title='', completed = false) {
            self.items.push({
              created: Date.now(),
              tilCompletion: length,
              length: length,
              day: date(),
              tagId: tag,
              text: text,
              title: title, 
              completed: completed,
              id: uuidv1(),
            })
        },
        deleteItem(id){
          console.log('deletion', id)
          self.items = self.items.filter(item => item.id != id)
          console.log(self.items.toJSON())
        },
        updateDate(date){
            self.currentDay = date
        },
        setEmptyTagIdToDefault(id){
          for(var itemNumber = 0; itemNumber < self.items.length; itemNumber++){
            const item = self.items[itemNumber]
            if(item.tagId == id){
              item.tagId ="Other"
            }
          }
        },
        getTimeToSpendForDay(day = moment(self.currentDay).format("YYYY/MM/DD")){
          console.log(moment(self.currentDay).format("YYYY/MM/DD"))
          const dailyItems = self.items.filter(item => { 
              return item.day == day
            })
          var time = 0
          dailyItems.map(item => time+= item.tilCompletion)
          return time
        }

    }))



// create an instance from a snapshot
const store = ItemStore.create({
    items: [
       {
      created: Date.now(),
      tilCompletion: 13,
      completed: false,
      length: 13,
      day: date(),
      text: "Study for accounting",
      tagId: "Home",
      id: uuidv1(),
    },
    {
      created: Date.now(),
      tilCompletion: 13,
      completed: true,
      length: 13,
      day: date(),
      text: "Study",
      tagId: "Home",
      id: uuidv1(),
    },
    {
      created: Date.now(),
      tilCompletion: 13,
      completed: true,
      length: 13,
      day: date(),
      text: "Work",
      tagId: "Other",
      id: uuidv1(),
    }
    ],
    currentDay: new Date().getTime(),
})

const Time = types
.model("Time", {
  // its date cuz id is date
  selectedItem: types.maybe(types.string),
  isCounting: types.boolean,
  count: types.integer,
})
.actions( self => ({
  reverseCounting(id=undefined){
    self.selectedItem = id
    self.isCounting = !self.isCounting
  },
  resetCount(){
    self.count = 0
  },
  setTimeToItem(){

    if(self.selectedItem){
      store.items[store.index(self.selectedItem)].updateTimeTilCompletion(self.count)
      console.log('updating item with time')
      console.log(store.items[store.index(self.selectedItem)].toJSON())
      self.selectedItem = undefined
    } else {
      store.addItem('', self.count, "Other", '', true)
    }
  },
  incrementCount(){
    self.count += 1
  }
}))
const timeStore = Time.create({
  selectedItem: undefined,
  isCounting: false,
  count: 0,
})  

export  {timeStore}
export default store
