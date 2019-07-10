import { types } from "mobx-state-tree";
import store from "./store.js";
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
      return self.tags.findIndex(tag => tag.id == id);
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
    deleteTag(id) {
      console.log(id);
      store.setEmptyTagIdToDefault(id);
      self.tags = self.tags.filter(obj => obj.id != id);

      // TODO: set everything with that id to other
    },
    updateTag(id, text) {
      const index = self.tags.findIndex(obj => obj.id == id);
      self.tags[index].updateTag(text);
    },
    updateColor(id, color) {
      self.tags[self.index(id)].updateColor(color);
    }
  }));

const tagStore = TagStore.create({
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
      color: "#e66465"
    }
  ]
});

export default tagStore;
