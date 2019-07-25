import React from 'react'
import {ItemStore} from "../stores/store.js"
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Calendar from '../calendar/Calendar.jsx'

describe('Calendar', () => {
	test("it renders without crashing", () => {
		const store = ItemStore.create({items: [], currentDay: new Date().getTime()})
		const node = render(<Calendar store={store}/>)
	})
})