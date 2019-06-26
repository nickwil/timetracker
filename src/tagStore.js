import { types } from "mobx-state-tree"
const uuidv1 = require('uuid/v1');

const Tag = types
.model("Tag", {
  name: types.string,
  id: types.string,
})

const TagStore = types
    .model("ItemStore", {
        tags: types.array(Tag),
    })
    .actions(self => ({ 
    	addTag(name){
    		self.tags.push({name, iid: uuidv1()})
    	},
    	deleteTag(id){
    		self.tags..filter(obj=> obj.id != id)
    	}
    }))

const tagStore = TagStore.create({
  tags: []
})  

export default tagStore