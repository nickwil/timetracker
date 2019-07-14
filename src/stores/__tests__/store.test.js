import { ItemStore } from "../store.js"

describe("ItemStore", () => {
  it("creates new items", () => {
    const store = ItemStore.create({items:[], currentDay: 10000})
    store.addItem("todo1", 10)
    store.addItem("todo2", 20)
    expect(store.items.length).toBe(2)
    expect(store.items[0].text).toBe("todo1")
    expect(store.items[1].text).toBe("todo2")
 })
})