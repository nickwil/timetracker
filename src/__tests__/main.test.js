import React from 'react'
import {ItemStore} from "../stores/store.js"
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Home from '../main/Home.jsx'
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
  test('adding a task', () => {

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

  })
})
  afterEach(cleanup)