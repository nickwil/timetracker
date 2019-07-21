import React from 'react'
import {ItemStore, Time} from "../stores/store.js"
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Settings from '../settings/Settings.jsx'
const moment = require("moment")
describe("Source", () => {
	test("Settings renders without crashing", () => {
		const node = render(<Settings/>)
	})
})