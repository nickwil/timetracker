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
  it("gets uncompleted items from today", () => {
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

    expect(store.unCompletedTodos.length).toBe(1)
    expect(store.unCompletedTodos[0].day).toBe(day)
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
    expect(store.months.length).toBe(2)
    expect(store.months[0]).toBe("2018/04")

  }),
  it("get all weeks that items exist in", () => {

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
      day: "2017/04/21",
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
    expect(store.weeks.length).toBe(3)
    expect(store.weeks[0]).toBe("2018/04/1")
    expect(store.weeks[1]).toBe("2017/04/3")
  }),
  it("creates new items", () => {
    const store = ItemStore.create({items:[], currentDay: 10000})
    store.addItem("todo1", 10)
    store.addItem("todo2", 20)
    expect(store.items.length).toBe(2)
    expect(store.items[0].text).toBe("todo1")
    expect(store.items[1].text).toBe("todo2")
 }),
  it("gets item export", () => {
    const store = ItemStore.create({items:[{
      created: new Date(1563139533485),
      tilCompletion: 5,
      completed: true,
      length: 5,
      day: "2019/08/08",
      text: "Study",
      tagId: "Home",
      id: "2"
    }], currentDay: new Date().getTime()})
    expect(store.exportItemsData.replace(/ /g, '')).toBe(`#1 
    • text: Study 
    • created: 1563139533485 
    • tilCompletion: 5 
    • day: 2019/08/08 
    • completed: true 
    • length: 5 
    • tagId: Home 
    • id: 2
    `.replace(/ /g, ''))

  }),
  it("gets item export", () => {
    const items = [{
      created: new Date(1563139533485),
      tilCompletion: 5,
      completed: true,
      length: 5,
      day: "2019/08/08",
      text: "Study",
      tagId: "Home",
      id: "2"
    }]
    const store = ItemStore.create({items: items, currentDay: new Date().getTime()})
    
    expect(store.importItemsData(store.exportItemsData)).toStrictEqual(items)

  }),
  it("get items from a week", () => {

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/02",
      text: "Study",
      tagId: "School",
      id: "2"
    },{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/05",
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
    const items = store.completedTodosFromWeek("2017", "04" ,"01")
    expect(items.length).toBe(2)
  }),
    it("get items from a month", () => {

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/02",
      text: "Study",
      tagId: "School",
      id: "2"
    },{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/21",
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
    const items = store.completedTodosFromMonth("2017", "04")
    expect(items.length).toBe(2)
  }),
    it("get items from a month", () => {

    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2016/04/02",
      text: "Draw",
      tagId: "Home",
      id: "2"
    },{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/21",
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
    const items = store.completedTodosFromYear("2017")
    expect(items.length).toBe(1)
    expect(items[0].text).toBe("Study")
  }),
  it("creates new items", () => {
    const store = ItemStore.create({items:[], currentDay: 10000})
    store.addItem("todo1", 10)
    store.addItem("todo2", 20)
    expect(store.items.length).toBe(2)
    expect(store.items[0].text).toBe("todo1")
    expect(store.items[1].text).toBe("todo2")
 }),
  it("gets the index with an id", () => {
    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2019/08/01",
      text: "Study",
      tagId: "School",
      id: "apple"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: "2019/08/02",
      text: "Clean",
      tagId: "Home",
      id: "pear"
    }], currentDay: new Date().getTime()})
    const index = store.index("pear")
    expect(store.items[index].text).toBe("Clean")

  }),
  it("get the amount of time spent for each tag", () => {
    const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/02",
      text: "Draw",
      tagId: "Home",
      id: "2"
    },{
      created: Date.now(),
      tilCompletion: 20,
      completed: true,
      length: 20,
      day: "2017/04/21",
      text: "Study",
      tagId: "School",
      id: "2"
    },
    {
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: "2019/02/01",
      text: "Clean",
      tagId: "Home",
      id: "1"
    }], currentDay: new Date().getTime()})

    const tags = [  {
      name: "Home",
      id: "Home",
    },   {
      name: "School",
      id: "School",
    }]
    const completedItems = store.completedTodosFromYear("2017")
    const timesFromTagsWithCompletedItems = store.getTimeFromEachTag(tags , completedItems)
    expect(timesFromTagsWithCompletedItems[0].value).toBe(20)
    expect(store.getTimeFromEachTag(tags)[0].value).toBe(30)

  })
})
  
