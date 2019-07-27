import {TagStore} from "./tagStore.js"
import {ItemStore} from "./store.js"
describe("TagStore", () => {
	it("add tag", () => {
		const store = TagStore.create({tags: []})
		store.addTag("Home")
		expect(store.tags.length).toBe(1)
		expect(store.tags[0].name).toBe("Home")
	}),
	it("delete tag", () => {
		const tagStore = TagStore.create({
		  tags: [
		    
		    {
		      name: "Home",
		      id: "Home",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Pear",
		      id: "Pear",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Other",
		      id: "Other",
		      canDelete: true,
		      color: "#e66465"
		    },
		  ]
		});
		tagStore.deleteTag("Pear")
		expect(tagStore.tags.length).toBe(2)
		expect(tagStore.tags[0].name).toBe("Home")
		const store = ItemStore.create({items:[{
		  created: Date.now(),
		  tilCompletion: 20,
		  completed: true,
		  length: 20,
		  day: "2019/01/10",
		  text: "Study",
		  tagId: "Home",
		  id: "2"
		},
		{
		  created: Date.now(),
		  tilCompletion: 10,
		  completed: false,
		  length: 10,
		  day: "2019/01/10",
		  text: "Clean",
		  tagId: "Home",
		  id: "1"
		}], currentDay: new Date().getTime()})
		tagStore.deleteTag("Home", store)
		expect(store.items[0].tagId).toBe("Other")
	}),
	it("update tag", () => {
		const tagStore = TagStore.create({
		  tags: [
		    
		    {
		      name: "Home",
		      id: "Home",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Pear",
		      id: "Pear",
		      canDelete: true,
		      color: "#e66465"
		    },
		    
		  ]
		});
		tagStore.updateTag("Pear", "Apple")
		expect(tagStore.tags[1].id).toBe("Pear")
		expect(tagStore.tags[1].name).toBe("Apple")
	}),
	it("update color of tag", () => {
		const tagStore = TagStore.create({
		  tags: [
		    
		    {
		      name: "Home",
		      id: "Home",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Pear",
		      id: "Pear",
		      canDelete: true,
		      color: "#e66465"
		    },
		    
		  ]
		});
		tagStore.updateColor("Pear", "#0000")
		expect(tagStore.tags[1].color).toBe("#0000")
	}),
	it("get index of tag", () => {
		const tagStore = TagStore.create({
		  tags: [
		    
		    {
		      name: "Home",
		      id: "Home",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Pear",
		      id: "Pear",
		      canDelete: true,
		      color: "#e66465"
		    },
		    
		  ]
		});
		const index = tagStore.index("Pear")
		expect(tagStore.tags[index].name).toBe("Pear")
	}),
	it("tag store can be set to its default", () => {
		const tagStore = TagStore.create({
		  tags: [
		    
		    {
		      name: "Home",
		      id: "Home",
		      canDelete: true,
		      color: "#e66465"
		    },
		    {
		      name: "Pear",
		      id: "Pear",
		      canDelete: true,
		      color: "#e66465"
		    },
		    
		  ]
		});
		tagStore.setToDefault()
		console.log(JSON.stringify(tagStore.tags.toJSON()))
		expect(JSON.stringify(tagStore.tags.toJSON())).toBe(JSON.stringify([{
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
      }]))
	})
})

