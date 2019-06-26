import { types } from "mobx-state-tree"
const uuidv1 = require('uuid/v1');

const Tag = types
.model("Tag", {
  name: types.string,
  id: types.string,
  canDelete: types.boolean,
})

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
    		self.tags = self.tags.filter(obj=> obj.id != id)
        
    	}
    }))

const tagStore = TagStore.create({
  tags: [{
  	name: "Other",
  	id: "Other",
    canDelete: false,
  }]
})  

export default tagStore