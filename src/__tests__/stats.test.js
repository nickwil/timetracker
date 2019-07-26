import React from 'react'
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import {ItemStore} from "../stores/store.js"
import {TagStore} from "../stores/tagStore.js"
import DateStats from '../stats/DateStats.jsx'
import '@testing-library/jest-dom/extend-expect'

const moment = require("moment")
describe("Stats Page", () => {
	test("Stats renders without crashing", async() => {
		const store = ItemStore.create({items: 
		[{
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2018/01/01",
	      text: "Another Item",
	      tagId: "Home",
	      id: "3"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/02/01",
	      text: "This one",
	      tagId: "Other",
	      id: "2"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/03/01",
	      text: "This one",
	      tagId: "Work",
	      id: "1"
	    }], 
	    currentDay: new Date().getTime()})
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
		    },
		    {
		      name: "Work",
		      id: "Work",
		      canDelete: true,
		      color: "#e66465"
		    }
		  ]
		});
		const {getByLabelText} = render(<DateStats store={store} tagStore={tagStore}/>)
		/*render(<DateStats year="2019" store={store} tagStore={tagStore}/>)
		render(<DateStats year="2019" month="02" store={store} tagStore={tagStore}/>)
		const {getByLabelText} = render(<DateStats year="2019" month="03" week="1" store={store} tagStore={tagStore}/>)
		*/
		const statsPage = await getByLabelText('Time Spent Working')
    	expect(statsPage).not.toHaveTextContent("There is no data for this time period")
		
	}),
	test("can render just elements from a certain year", async() => {
		const store = ItemStore.create({items: 
		[{
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2018/01/01",
	      text: "Another Item",
	      tagId: "Home",
	      id: "3"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/02/01",
	      text: "This one",
	      tagId: "Other",
	      id: "2"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/03/01",
	      text: "This one",
	      tagId: "Work",
	      id: "1"
	    }], 
	    currentDay: new Date().getTime()})
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
		    },
		    {
		      name: "Work",
		      id: "Work",
		      canDelete: true,
		      color: "#e66465"
		    }
		  ]
		});
		const {getByLabelText} = render(<DateStats year="2019" store={store} tagStore={tagStore}/>)
		/*render(<DateStats year="2019" month="02" store={store} tagStore={tagStore}/>)
		const {getByLabelText} = render(<DateStats year="2019" month="03" week="1" store={store} tagStore={tagStore}/>)
		*/
		const statsPage = await getByLabelText('Time Spent Working')
    	expect(statsPage).not.toHaveTextContent("There is no data for this time period")
	}),
	test("can render with elements from a year and month", async() => {
		const store = ItemStore.create({items: 
		[{
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2018/01/01",
	      text: "Another Item",
	      tagId: "Home",
	      id: "3"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/02/01",
	      text: "This one",
	      tagId: "Other",
	      id: "2"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/03/01",
	      text: "This one",
	      tagId: "Work",
	      id: "1"
	    }], 
	    currentDay: new Date().getTime()})
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
		    },
		    {
		      name: "Work",
		      id: "Work",
		      canDelete: true,
		      color: "#e66465"
		    }
		  ]
		});
		const {getByLabelText} = render(<DateStats year="2019" month="02" store={store} tagStore={tagStore}/>)
		const statsPage = await getByLabelText('Time Spent Working')
    	expect(statsPage).not.toHaveTextContent("There is no data for this time period")
	}),
	test("can render with elements from a year, month, and week number", async() => {
		const store = ItemStore.create({items: 
		[{
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2018/01/01",
	      text: "Another Item",
	      tagId: "Home",
	      id: "3"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/02/01",
	      text: "This one",
	      tagId: "Other",
	      id: "2"
	    },
	    {
	      created: Date.now(),
	      tilCompletion: 10,
	      completed: false,
	      length: 10,
	      day: "2019/03/01",
	      text: "This one",
	      tagId: "Work",
	      id: "1"
	    }], 
	    currentDay: new Date().getTime()})
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
		    },
		    {
		      name: "Work",
		      id: "Work",
		      canDelete: true,
		      color: "#e66465"
		    }
		  ]
		});
		const {getByLabelText} = render(<DateStats year="2019" month="03" week="1" store={store} tagStore={tagStore}/>)
		
		const statsPage = await getByLabelText('Time Spent Working')
    	expect(statsPage).not.toHaveTextContent("There is no data for this time period")
	})
})
afterEach(cleanup)