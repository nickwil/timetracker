import React from 'react'
import {ItemStore, Time} from "../stores/store.js"
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { observer } from "mobx-react-lite";

import Home from '../main/Home.jsx'
import DateHome from "../main/DateHome.jsx"
const moment = require("moment")

describe('Home', () => {
  test('it renders without crashing', () => {
    // Arrange
    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const props = {
      store,
      dayFromUrl: new Date().getTime(),
      timeStore: timeStore
    }

    const node = render(<Home {...props} />)
  }),
  test('adding a item', () => {

    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const props = {
      store,
      dayFromUrl: new Date().getTime(),
      timeStore
    }
    const { getByText, getByLabelText, getByPlaceholderText, queryByTestId } = render(<Home {...props} />)
    // The user arrives to a page that has nothing in the remaining
    const remainingSection = getByLabelText('Remaining')
    // NOTE: The only child would be the header 
    expect(remainingSection).toHaveTextContent("Remaining")
    expect(remainingSection.children.length).toBe(1)
    // The user also sees that there is nothing in the completed section
    const completedSection = getByLabelText('Completed')
    // NOTE: The only child would be the header 
    expect(completedSection).toHaveTextContent("Completed")
    expect(completedSection.children.length).toBe(1)
    // The user, now determined to complete something, decides to add a task
    // 1. They click the add button
    const addButton = getByText("+")
    fireEvent.click(addButton)
    // 2. They fill out the task input
    fireEvent.change(getByPlaceholderText("task..."), {target: {value: 'Study'}})
    fireEvent.change(getByPlaceholderText("time.."), {target: {value: 10}})
    // 3. They submit the form
    fireEvent.click(getByText(/Submit/i))
    // They now check that the remaining section has their task
    const id = store.items[0].id
    expect(getByLabelText('Remaining').children.length).toBe(2)
    expect(queryByTestId("item-input-descrip:"+id)).toHaveValue('Study')

  }),
  test("edit an item description", () => {
    const store = todayItemStore()
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { 
    	getByDisplayValue, 
    	getByText, 
    	getByLabelText, 
    	getByPlaceholderText, 
    	queryByTestId,
      getAllByDisplayValue } = render(<Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} />)
	// The user already has an item and they want to edit it. To do so they go to the description and write something
	// new in the input 
	const description = getAllByDisplayValue("Something")[0]
	fireEvent.change(description, {target: {value: 'Study something'}})
	// The user now sees their changed description as the new description
	expect(description).toHaveValue("Study something")

  }),
  test("change tag", () => {
	const store = todayItemStore()
	const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { 
    	getByDisplayValue, 
    	getByText, 
    	getByLabelText, 
    	getByPlaceholderText, 
    	queryByTestId } = render(<Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} />)
	// The user decides to change the tag of their task from Home to Other
	const select = queryByTestId("tags-selection")
	
    fireEvent.change(select, {
    target: {value: 'Other'},
  });


	// The user now sees their changed description as the new description
	expect(store.items[0].tagId).toBe("Other")
  }),
   test("delete item", () => {
	const day = moment().format("YYYY/MM/DD")
  	const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: day,
      text: "Something",
      tagId: "Home",
      id: "1"
    },{
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: day,
      text: "Another Item",
      tagId: "Home",
      id: "1"
    },], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { queryAllByText, getByLabelText } = render(<Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} />)
	// The user decides to delete the item they've created in the Remaining section
	const deleteButtons = queryAllByText("Delete")
	const deleteButton = deleteButtons[0]
	fireEvent.click(deleteButton)
	const remainingSection = getByLabelText('Remaining')
    // NOTE: The only child would be the header 
    expect(remainingSection).toHaveTextContent("Remaining")
    expect(remainingSection.children.length).toBe(1)
	// The user decides to delete the item they've created in the Completed Section
  }),
   test("change time of an item", () => {
  	const store = todayItemStore()
  	 const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { getByLabelText, getByPlaceholderText, queryByTestId } = render(<Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} />)
	// The user decides to change the time of their task in the Remaining section
	const changeTimeInput = getByPlaceholderText("change time for task")
	// The user uses the side input to update the time
	fireEvent.change(changeTimeInput, {target: {value: 20}})
	const remainingItems = queryByTestId('remaining-items')
	// The user sees the updated time on the item
    expect(remainingItems).toHaveTextContent("20")
  }),
  test("can click on an item and lower it's time", async () => {
  	const store = todayItemStore()
  	const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { getByText, queryByTestId } = render(
    	<Home 
    	store={store} 
    	timeStore={timeStore}
    	dayFromUrl={new Date().getTime()} />)
    // The user clicks the time it has 
    fireEvent.click(getByText("10s")) 
    // The timer increments and changes per second
     await wait(() => {

      expect(queryByTestId("time-tracker")).toHaveTextContent("0:02")
      
    })
     fireEvent.click(queryByTestId("play/pause-button"))

    // The user presses the pause button to end the time
    const remainingItems = queryByTestId('remaining-items')
	// The user sees the updated time on the item (8 seconds)
    expect(remainingItems).toHaveTextContent("8s")
    

  }),test("finish an item and bring it to completed", async () => {
  	const store = todayItemStore("Study", 1)
  	const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { getByText, queryByTestId } = render(
    	<Home 
    	store={store} 
    	timeStore={timeStore}
    	dayFromUrl={new Date().getTime()} />)
    // The user clicks the time it has 10 seconds remaining
    fireEvent.click(getByText("1s")) 
    // The timer increments and changes per second
     await wait(() => {

      expect(queryByTestId("time-tracker")).toHaveTextContent("00:01")
      
    })
     // The user presses the pause button to end the time
     fireEvent.click(queryByTestId("play/pause-button"))

    
    const remainingItems = queryByTestId('completed-items')
	// The user sees the completed item on the completed section
    expect(remainingItems).toHaveTextContent("1s")


    

  }),
  test("finish an item by using the mark as completed button", async () => {
    const store = todayItemStore("Study", 1)
    const timeStore = Time.create({
      selectedItem: undefined,
      isCounting: false,
      count: 0
  });
    const { getByText, queryByTestId } = render(
      <Home 
      store={store} 
      timeStore={timeStore}
      dayFromUrl={new Date().getTime()} />)
    // The user clicks the mark as completed button 
      fireEvent.click(getByText("Mark as completed"))
    

    
    const completedItems = queryByTestId('completed-items')
  // The user sees the completed item on the completed section
    expect(completedItems).toHaveTextContent("1s")

    
    

  }),
  test("can start and end an item with the play/pause button", async () => {
  	const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
   	const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { getByText, queryByTestId } = render(
    	<Home 
    	store={store} 
    	timeStore={timeStore}
    	dayFromUrl={new Date().getTime()} />)
    // The user clicks the play/pause button to start the task
    fireEvent.click(queryByTestId("play/pause-button"))
     await wait(() => {

      expect(queryByTestId("time-tracker")).toHaveTextContent("00:01")
      
    })
    // The user presses the play/pause button to end the time
    fireEvent.click(queryByTestId("play/pause-button"))

    const completedItems = queryByTestId('completed-items')
	// The user sees the completed item on the completed section
    expect(completedItems).toHaveTextContent("1s")
  }),
  test("open item modal and do an action", () => {
  	const store = todayItemStore()
   	const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { getByText, queryByTestId, getByPlaceholderText } = render(
    	<Home 
    	store={store} 
    	timeStore={timeStore}
    	dayFromUrl={new Date().getTime()} />)
    // The user clicks the menu of the item
    const id = store.items[0].id
    fireEvent.click(queryByTestId("item-menu:" + id))
    // The user changes the value of the input to 20
    fireEvent.change(queryByTestId("modal-item-menu-input:"+id), {target: {value: 20}})
    // The user closes the modal
    fireEvent.click(getByText("Close"))
    const remainingItems = queryByTestId('remaining-items')
	// The user sees the completed item on the completed section
    expect(remainingItems).toHaveTextContent("20s")
  }),
  test('use the add item modal', () => {

    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const props = {
      store,
      dayFromUrl: new Date().getTime(),
      timeStore
    }
    const { getByText, getByLabelText, getByPlaceholderText, queryByTestId } = render(<Home {...props} />)
    // The user arrives to a page that has nothing in the remaining
    const remainingSection = getByLabelText('Remaining')
    // NOTE: The only child would be the header 
    expect(remainingSection).toHaveTextContent("Remaining")
    expect(remainingSection.children.length).toBe(1)
    // The user also sees that there is nothing in the completed section
    const completedSection = getByLabelText('Completed')
    // NOTE: The only child would be the header 
    expect(completedSection).toHaveTextContent("Completed")
    expect(completedSection.children.length).toBe(1)
    // The user, now determined to complete something, decides to add a task
    // 1. They click the add button
    const addButton = getByText("+")
    fireEvent.click(addButton)
    // 2. They fill out the task input
    fireEvent.change(getByPlaceholderText("task..."), {target: {value: 'Study'}})
    // 3. They use the clock time to fill out their time
    // They enter 10:00 AM as their start time
    // They accidentally enter 13 and 61 which are incorrect times
    // a red styling appears to show they are incorrect
    fireEvent.change(queryByTestId("from-hours"), {target: {value: "13"}})
    fireEvent.change(queryByTestId("from-minutes"), {target: {value: "61"}})
    // Their error is prevented as they cannot submit until the time is not negative
    fireEvent.click(getByText(/Submit/i))
    // They then correctly enter the time
    fireEvent.change(queryByTestId("from-hours"), {target: {value: "10"}})
    fireEvent.change(queryByTestId("from-minutes"), {target: {value: "00"}})

    // They fill out the end time
    fireEvent.change(queryByTestId("until-hours"), {target: {value: "10"}})
    fireEvent.change(queryByTestId("until-minutes"), {target: {value: "00"}})
    // They change the end time from AM to PM
    fireEvent.change(queryByTestId("until-time-of-day"), {target: {value: "PM"}})
    // They change the default task
    const select = queryByTestId("tags-selection")
	
    fireEvent.change(select, {
    target: {value: 'Other'},
  });
    // Finally they submit the form
    fireEvent.click(getByText(/Submit/i))
    // They now check that the remaining section has their task
    const id = store.items[0].id

    const remainingItems = queryByTestId('remaining-items')
    expect(remainingItems).toHaveTextContent("12h")
    expect(queryByTestId("item-input-descrip:"+id)).toHaveValue('Study')

  }),
  test("can see only data from a certain date", () => {
  	const day = moment().format("YYYY/MM/DD")
  	const previousDate = moment("2019/07/07").format("YYYY/MM/DD")
  	const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: day,
      text: "Work",
      tagId: "Home",
      id: "1"
    },{
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: previousDate,
      text: "Another Item",
      tagId: "Home",
      id: "1"
    },], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { queryByTestId, getByLabelText } = render(
    	<Home
     	timeStore={timeStore} 
     	store={store} 
    	dayFromUrl={new Date(previousDate).getTime()} />)
	// The user can only see the "Another Item" item
	// NOTE: Since both have the same id the testid is the same so this test will fail if both appear because more than on element would have the same testid
    expect(queryByTestId("item-input-descrip:1")).toHaveValue("Another Item")
    const remainingSection = getByLabelText('Remaining')

  }),
  test("can see only data from a certain date with DateHome", () => {
  	const day = moment().format("YYYY/MM/DD")
  	const previousDate = moment("2019/07/07").format("YYYY/MM/DD")
  	const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: 10,
      completed: false,
      length: 10,
      day: day,
      text: "Work",
      tagId: "Home",
      id: "1"
    },{
      created: Date.now(),
      tilCompletion: 10,
      completed: true,
      length: 10,
      day: previousDate,
      text: "Another Item",
      tagId: "Home",
      id: "1"
    },], currentDay: new Date().getTime()})
    const timeStore = Time.create({
		  selectedItem: undefined,
		  isCounting: false,
		  count: 0
	});
    const { queryByTestId, getByLabelText } = render(
    	<DateHome
     	timeStore={timeStore} 
     	store={store} 
    	year="2019"
    	month="07"
    	day="07" />)
	// The user can only see the "Another Item" item
	// NOTE: Since both have the same id the testid is the same so this test will fail if both appear because more than on element would have the same testid
    expect(queryByTestId("item-input-descrip:1")).toHaveValue("Another Item")
    const remainingSection = getByLabelText('Remaining')

  })


})
function todayItemStore(defaultText="Something", time=10){
	const day = moment().format("YYYY/MM/DD")
  	const store = ItemStore.create({items:[{
      created: Date.now(),
      tilCompletion: time,
      completed: false,
      length: time,
      day: day,
      text: defaultText,
      tagId: "Home",
      id: "1"
    },], currentDay: new Date().getTime()})
    return store
}
afterEach(cleanup)
