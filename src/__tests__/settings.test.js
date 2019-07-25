import React from 'react'
import {ItemStore} from "../stores/store.js"
import {TagStore} from "../stores/tagStore.js"
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Settings from '../settings/Settings.jsx'
const moment = require("moment")
describe("Source", () => {
	test("Settings renders without crashing", () => {
		const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const tagStore = TagStore.create({
	  tags: []
	});
		const node = render(<Settings store={store} tagStore={tagStore}/>)
	}),
	test("can add new tags", () => {
    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
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
    const { getByText, getByLabelText, getByPlaceholderText, queryByTestId } = render(<Settings store={store} tagStore={tagStore} />)
    // The user enters their new tag into the tag input
    fireEvent.change(getByLabelText("New tag:"), {target: {value: "Wow"}})
    // The user presses enter to add their new tag
    fireEvent.click(getByText("Add"))
    // The user sees their new tag pop up
    const currentTags = getByLabelText("Current Tags")
    expect(currentTags).toHaveTextContent("Wow")
	}),
	test("can update tag name", () => {
		const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
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
    const { getByText, getByLabelText, getByPlaceholderText, getAllByText } = render(<Settings store={store} tagStore={tagStore} />)
    // The user wants to change the 'Other' tag name to 'Etc'
    // They click the first edit button
    fireEvent.click(getAllByText("Edit")[0])
    // They enter in the new value
    fireEvent.change(getByLabelText("Editing tag:"), {target: {value: "Etc"}})
    // The user clicks the save button
    fireEvent.click(getAllByText("Save")[0])
	    
    // The user sees their newly named tag there and no mention of 'Other'
    const currentTags = getByLabelText("Current Tags")
    expect(currentTags).toHaveTextContent("Etc")
    expect(currentTags).not.toHaveTextContent("Other")
	}),
	test("can delete tag", () => {
		const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
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
	    const { getByText, getByLabelText } = render(<Settings store={store} tagStore={tagStore} />)
	    // The user wants to delete the Home tag
	    // They click the delete button
	    fireEvent.click(getByText("X"))
	    // They click the confirmation
	    fireEvent.click(getByText("Delete tag"))
	    // The Home text should not be anywhere on the page as the user deleted it
	    const currentTags = getByLabelText("Current Tags")
	    expect(currentTags).not.toHaveTextContent(/Home/)
	   
	}),
	test("update color of an element", () => {
		const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
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
	    const { getByText, queryAllByLabelText } = render(<Settings store={store} tagStore={tagStore} />)
	    // The user changes the color to #000
	    const node = queryAllByLabelText("Color:")[0]
	    fireEvent.change(node, {target: {value: "#000"}})
	    // The user now sees the color as #000000
	    expect(node).toHaveValue("#000000")

	}),
	test("can get export text", () => {
		const store = ItemStore.create({items:[{
	      created: new Date("2016/04/02").getTime(),
	      tilCompletion: 20,
	      completed: true,
	      length: 20,
	      day: "2016/04/02",
	      text: "Draw",
	      tagId: "Home",
	      id: "1"
		}], currentDay: new Date().getTime()})
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
	    const { getByText, getByLabelText } = render(<Settings store={store} tagStore={tagStore} />)
	    expect(getByLabelText("Data:")).toHaveValue(`#1 
• text: Draw 
• created: 1459569600000 
• tilCompletion: 20 
• day: 2016/04/02 
• completed: true 
• length: 20 
• tagId: Home 
• id: 1
`)
	}),
	test("can import the export text", () => {
		const store = ItemStore.create({items:[{
	      created: new Date("2016/04/02").getTime(),
	      tilCompletion: 20,
	      completed: true,
	      length: 20,
	      day: "2016/04/02",
	      text: "Draw",
	      tagId: "Home",
	      id: "1"
		}], currentDay: new Date().getTime()})
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
	    const { getByText, getByLabelText } = render(<Settings store={store} tagStore={tagStore} />)
	    const importText = getByLabelText("Data:").value
	    fireEvent.change(getByLabelText("Import:"), {target: {value: importText}})
	    fireEvent.click(getByText("Import"))
	    expect(getByLabelText("Data:")).toHaveValue(`#1 
• text: Draw 
• created: 1459569600000 
• tilCompletion: 20 
• day: 2016/04/02 
• completed: true 
• length: 20 
• tagId: Home 
• id: 1
`)
	})
})
afterEach(cleanup)
