import React from 'react'
import {ItemStore} from "../stores/store.js"
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { observer } from "mobx-react-lite";

import Home from '../main/Home.jsx'
const moment = require("moment")

describe('Home', () => {
  test('it renders without crashing', () => {
    // Arrange
    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const props = {
      store,
      dayFromUrl: new Date().getTime()
    }
    const node = render(<Home {...props} />)
  }),
  test('adding a item', () => {

    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const props = {
      store,
      dayFromUrl: new Date().getTime()
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
    const addButton = getByText("Add task")
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
    const { 
    	getByDisplayValue, 
    	getByText, 
    	getByLabelText, 
    	getByPlaceholderText, 
    	queryByTestId } = render(<Home store={store} dayFromUrl={new Date().getTime()} />)
	// The user already has an item and they want to edit it. To do so they go to the description and write something
	// new in the input 
	const description = getByDisplayValue("Something")
	fireEvent.change(description, {target: {value: 'Study something'}})
	// The user now sees their changed description as the new description
	expect(description).toHaveValue("Study something")

  }),
  test("change tag", () => {
	const store = todayItemStore()
    const { 
    	getByDisplayValue, 
    	getByText, 
    	getByLabelText, 
    	getByPlaceholderText, 
    	queryByTestId } = render(<Home store={store} dayFromUrl={new Date().getTime()} />)
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
    const { queryAllByText, getByLabelText } = render(<Home store={store} dayFromUrl={new Date().getTime()} />)
	// The user decides to delete the item they've created in the Remaining section
	const deleteButtons = queryAllByText("Delete")
	const deleteButton = deleteButtons[0]
	fireEvent.click(deleteButton)
	const remainingSection = getByLabelText('Remaining')
    // NOTE: The only child would be the header 
    expect(remainingSection).toHaveTextContent("Remaining")
    expect(remainingSection.children.length).toBe(1)
	// The user decides to delete the item they've created in the Completed Section
  })
})
function todayItemStore(){
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
    },], currentDay: new Date().getTime()})
    return store
}
afterEach(cleanup)
