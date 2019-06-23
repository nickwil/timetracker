import { types, onSnapshot } from "mobx-state-tree"

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



    }))

const ItemStore = types
    .model("ItemStore", {
        items: types.array(Item),
        selectedItem: types.reference(Item)
    })
    .actions(self => {
        const instantiationTime = Date.now()

        function addTodo(text, length, tag, title='', completed = false) {
            self.todos.push({
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
        }

        return { addTodo }
    })

// create an instance from a snapshot
const store = Store.create({
    allItems: [
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
    ]
})

// listen to new snapshots
onSnapshot(store, snapshot => {
    console.dir(snapshot)
})