import React from "react"
import { Router } from "@reach/router"
import App from "./App.js"
import Calendar from "./Calendar.jsx"
import store from "./store.js"
import {date} from "./util/quick.js"
import Settings from "./Settings.jsx"
import Navigation from "./Navigation.jsx"

function Home(props){
	return (
		<section>
			<header>
				<Navigation/>
			</header>
			  <Router>
			  	<App store={store} dayFromUrl={new Date().getTime()} path="/"/>
			  	<DateApp store={store} path="/:year/:month/:day"/>

			  	<Settings path="settings/"/>


			  	<Calendar path="calendar/"/>
			  </Router>
		</section>
		)
}

function DateApp({store, year, month, day}){
	console.log(new Date(year+"/"+month+"/"+day).getTime())
	return <App dayFromUrl={new Date(year+"/"+month+"/"+day).getTime()} store={store}/>
}
export default Home