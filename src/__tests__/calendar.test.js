import React from 'react'
import { ItemStore } from '../stores/store.js'
import { render, fireEvent, cleanup, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Calendar from '../calendar/Calendar.jsx'
const moment = require('moment')
describe('Calendar', () => {
  test('it renders without crashing', () => {
    const store = ItemStore.create({
      items: [],
      currentDay: new Date().getTime(),
    })
    const node = render(<Calendar store={store} />)

    const renderWithRealDate = render(
      <Calendar year={2019} monthNo={10} store={store} />
    )

    const renderWithFakeDate = render(
      <Calendar year={2019} monthNo={13} store={store} />
    )
  }),
    test('it renders the calendar with items', () => {
      const day = moment().format('YYYY/MM/DD')
      const yesterday = moment()
        .subtract(1, 'day')
        .format('YYYY/MM/DD')
      const store = ItemStore.create({
        items: [
          {
            created: Date.now(),
            tilCompletion: 10,
            completed: true,
            length: 10,
            day: day,
            text: 'The Item',
            tagId: 'Home',
            id: '1',
          },
          {
            created: Date.now(),
            tilCompletion: 3601,
            completed: true,
            length: 3601,
            day: yesterday,
            text: 'Work',
            tagId: 'Home',
            id: '2',
          },
        ],
        currentDay: new Date().getTime(),
      })
      const node = render(<Calendar store={store} />)
    })
})
