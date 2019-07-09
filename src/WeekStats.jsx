import React from "react"
import Stats from "./Stats.jsx"

import store from "./store.js"
import tagStore from "./tagStore.js"

function WeekStats({year, month, week}){
	const items = store.completedTodosFromWeek(year, month, week)
	console.log(items)
	return <Stats data={store.getTimeFromEachTag(tagStore.tags, items)} />
}
export default WeekStats