import React from 'react'
import styles from './Calendar.module.css'
import Day from './Day.jsx'
import { observer } from 'mobx-react-lite'

const moment = require('moment')

const Week = observer(function Week({ weekNumber, days, month, store }) {
  // if week isn't full add empty days
  var extraDays = []
  if (days.length < 7) {
    var newMonth = moment(month).subtract(1, 'month')

    if (weekNumber === 1) {
      // if it's the first week

      newMonth.endOf('month').subtract(6 - days.length, 'day')
    } else {
      newMonth.add(2, 'month').startOf('month')
      // if it's not the first week then this can only run in the last week
    }
    while (days.length + extraDays.length < 7) {
      extraDays.push(
        <Day
          key={'key-for-day:' + newMonth.format('YYYY-MM-DD')}
          store={store}
          month={newMonth.format('YYYY-MM')}
          number={newMonth.date()}
        />
      )
      newMonth.add(1, 'day')
    }
  }
  if (weekNumber !== 1) {
    return (
      <div className={styles.week}>
        {days}
        {extraDays}
      </div>
    )
  } else {
    return (
      <div className={styles.week}>
        {extraDays}
        {days}
      </div>
    )
  }
})

export default Week
