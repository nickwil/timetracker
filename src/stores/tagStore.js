import { types } from "mobx-state-tree";
import store from "./store.js";
import { autorun } from "mobx"

const uuidv1 = require("uuid/v1");

const Tag = types
  .model("Tag", {
    name: types.string,
    id: types.string,
    canDelete: types.boolean,
    color: types.string
  })
  .actions(self => ({
    updateTag(text) {
      self.name = text;
    },
    updateColor(color) {
      self.color = color;
    }
  }));
const TagStore = types
  .model("ItemStore", {
    tags: types.array(Tag)
  })
  .views(self => ({
    index(id) {
      return self.tags.findIndex(tag => tag.id === id);
    }
  }))
  .actions(self => ({
    addTag(name) {
      self.tags.push({
        name: name,
        id: uuidv1(),
        canDelete: true,
        color: "#e66465"
      });
    },
    deleteTag(id, itemStore = store) {
      itemStore.setEmptyTagIdToDefault(id);
      self.tags = self.tags.filter(obj => obj.id !== id);
    },
    updateTag(id, text) {
      const index = self.tags.findIndex(obj => obj.id === id);
      self.tags[index].updateTag(text);
    },
    updateColor(id, color) {
      self.tags[self.index(id)].updateColor(color);
    },
    setToDefault(){
      self.tags = [{
        name: "Other",
        id: "Other",
        canDelete: false,
        color: "#e66465"
      },
      {
        name: "Home",
        id: "Home",
        canDelete: true,
        color: "#fff"
      }]
    }
  }));


function getTagsFromLocalStorage(){
  if(localStorage.getItem("tags") == null){
    return TagStore.create({
    tags: [
      {
        name: "Other",
        id: "Other",
        canDelete: false,
        color: "#e66465"
      },
      {
        name: "Home",
        id: "Home",
        canDelete: true,
        color: "#fff"
      }
    ]
  });
  } else {
    return TagStore.create({tags: JSON.parse(localStorage.getItem("tags"))})
  }
}
const tagStore = getTagsFromLocalStorage()
autorun(() => {
  localStorage.setItem("tags", JSON.stringify(tagStore.tags))
})
export {TagStore, getTagsFromLocalStorage}
export default tagStore;
