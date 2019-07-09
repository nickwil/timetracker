import React from "react"
import { Router } from "@reach/router"
import App from "./App.js"
import Calendar from "./Calendar.jsx"
import Stats from "./Stats.jsx"
import store from "./store.js"
import {date} from "./util/quick.js"
import Settings from "./Settings.jsx"
import Navigation from "./Navigation.jsx"
import tagStore from "./tagStore.js"
import MonthStats from "./MonthStats.jsx"
import YearStats from "./YearStats.jsx"
import WeekStats from "./WeekStats.jsx"
import { observer } from 'mobx-react-lite'

const Home = observer(function Home(props){
	return (
		<section>
			<header>
				<Navigation/>
			</header>
			  <Router>
			  	<App store={store} dayFromUrl={new Date().getTime()} path="/"/>
			  	<DateApp store={store} path="/:year/:month/:day"/>

			  	<Settings path="settings/"/>
			  	<Stats data={store.getTimeFromEachTag(tagStore.tags)} path="stats/"/>
			  	<WeekStats path="stats/:year/:month/:week"/>
			  	<MonthStats path="stats/:year/:month"/>
			  	<YearStats path="stats/:year"/>
			  	<Calendar path="calendar/"/>
			  </Router>
		</section>
		)
})

function DateApp({store, year, month, day}){
	console.log(new Date(year+"/"+month+"/"+day).getTime())
	return <App dayFromUrl={new Date(year+"/"+month+"/"+day).getTime()} store={store}/>
}
export default Home