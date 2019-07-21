import React from 'react'
import {ItemStore, Time} from "../stores/store.js"
import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { observer } from "mobx-react-lite";

import App from '../App.jsx'
const moment = require("moment")
describe("Source", () => {
	test("App renders without crashing", () => {
		render(<App/>)
	})
})