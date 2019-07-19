import React from 'react'
import {ItemStore} from "../stores/store.js"
import {render, fireEvent} from '@testing-library/react'
import Home from '../main/Home.jsx'
describe('Home', () => {
  test('it renders without crashing', () => {
    // Arrange
    const store = ItemStore.create({items:[], currentDay: new Date().getTime()})
    const props = {
      store,
      dayFromUrl: new Date().getTime()
    }
    render(<Home {...props} />)
  })
})