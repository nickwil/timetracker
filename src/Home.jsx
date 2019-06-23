import React from "react"
import { Router, Link } from "@reach/router"
import App from "./App.js"
import Calendar from "./Calendar.jsx"

function Home(props){
	return (
			  <Router>
			  	<App path="/"/>
			  	<Calendar path="cal"/>
			  </Router>
		)
}
export default Home