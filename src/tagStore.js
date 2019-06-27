import { types } from "mobx-state-tree"
import store from "./store.js"
const uuidv1 = require('uuid/v1');

const Tag = types
.model("Tag", {
  name: types.string,
  id: types.string,
  canDelete: types.boolean,
})
.actions(self => ({
  updateTag(text){
    self.name = text
  }
}))
const TagStore = types
    .model("ItemStore", {
        tags: types.array(Tag),
    })
    .actions(self => ({ 
    	addTag(name){
    		self.tags.push({name:name, id: uuidv1(), canDelete: true})
    	},
    	deleteTag(id){
        console.log(id)
        store.setEmptyTagIdToDefault(id)
    		self.tags = self.tags.filter(obj=> obj.id != id)

        // TODO: set everything with that id to other
    	},
      updateTag(id, text){
       const index = self.tags.findIndex(obj => obj.id == id)
       self.tags[index].updateTag(text)
      }
    }))

const tagStore = TagStore.create({
  tags: [{
  	name: "Other",
  	id: "Other",
    canDelete: false,
  },
  {
    name: "Home",
    id: "Home",
    canDelete: true,
  }]
})  

export default tagStore