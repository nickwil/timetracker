import { types, onSnapshot } from "mobx-state-tree"
import {date} from "./util/quick.js"

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
      id: types.Date /*shoukd be a string*/,
    
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
        // need a way to update that refrence
    //

    }))

const ItemStore = types
    .model("ItemStore", {
        items: types.array(Item),
        selectedItem: types.maybe(types.reference(Item)),
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
              // temp id creation
              id: Date.now(),
            })
        },
        updateDate(date){
            self.currentDay = date
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
      tagId: "Other",
      // temp id creation
      id: Date.now(),
    }
    ],
    currentDay: new Date().getTime(),
})
export default store
// listen to new snapshots
onSnapshot(store, snapshot => {
    console.dir(snapshot)
})