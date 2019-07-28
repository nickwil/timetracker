import React from 'react'
import Stats from './Stats.jsx'
import { observer } from 'mobx-react-lite'

const DateStats = observer(function DateStats({
  store,
  tagStore,
  year,
  month,
  week,
}) {
  var data
  if (year && month && week) {
    const items = store.completedTodosFromWeek(year, month, week)
    data = store.getTimeFromEachTag(tagStore.tags, items)
  } else if (year && month) {
    const items = store.completedTodosFromMonth(year, month)
    data = store.getTimeFromEachTag(tagStore.tags, items)
  } else if (year) {
    let items = store.completedTodosFromYear(year)
    data = store.getTimeFromEachTag(tagStore.tags, items)
  } else {
    data = store.getTimeFromEachTag(tagStore.tags)
  }
  return (
    <Stats
      years={store.years}
      months={store.months}
      weeks={store.weeks}
      data={data}
    />
  )
})
export default DateStats
