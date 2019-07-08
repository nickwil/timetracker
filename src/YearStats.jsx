import React from "react"
import Stats from "./Stats.jsx"

import store from "./store.js"
import tagStore from "./tagStore.js"

function YearStats({year}){
	const items = store.completedTodosFromYear(year)
	console.log(items)
	return <Stats data={store.getTimeFromEachTag(tagStore.tags, items)} />
}
export default YearStats