import { ItemStore } from "./store.js"
const moment = require("moment")
describe("ItemStore", () => {
  it("gets completed items from today", () => {
  	const day = moment().format("YYYY/MM/DD")

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: day,
      text: "Study",
      tagId: "School",
      id: "2"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: day,
      text: "Clean",
      tagId: "Home",
      id: "1"
    }], currentDay: new Date().getTime()})

    expect(store.completedTodos.length).toBe(1)
    expect(store.completedTodos[0].day).toBe(day)
 }),
  it("gets all completed items", () => {
  	const day = moment().format("YYYY/MM/DD")

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: false,
      length: 20,
      day: day,
      text: "Study",
      tagId: "School",
      id: "2"
    }
    ,{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: day,
      text: "Study",
      tagId: "School",
      id: "2"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: "2010/01/10",
      text: "Clean",
      tagId: "Home",
      id: "1"
    }], currentDay: new Date().getTime()})

    expect(store.allCompletedTodos.length).toBe(2)
 }),
  it("get all years that items exist in", () => {

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2018/01/01",
      text: "Study",
      tagId: "School",
      id: "2"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: "2019/01/01",
      text: "Clean",
      tagId: "Home",
      id: "1"
    }], currentDay: new Date().getTime()})
    expect(store.years.length).toBe(2)
    expect(store.years[0]).toBe("2018")

  }),
  it("get all months that items exist in", () => {

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2018/04/01",
      text: "Study",
      tagId: "School",
      id: "2"
    },{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2018/04/01",
      text: "Study",
      tagId: "School",
      id: "2"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: "2019/02/01",
      text: "Clean",
      tagId: "Home",
      id: "1"
    }], currentDay: new Date().getTime()})
    console.log(store.months)
    expect(store.months.length).toBe(2)
    expect(store.months[0]).toBe("2018/04")

  }),
  it("creates new items", () => {
    const store = ItemStore.create({items:[], currentDay: 10000})
    store.addItem("todo1", 10)
    store.addItem("todo2", 20)
    expect(store.items.length).toBe(2)
    expect(store.items[0].text).toBe("todo1")
    expect(store.items[1].text).toBe("todo2")
 })
})
  
