import React from "react"
import CustomLink from "./CustomLink.jsx"
import styles from "./Navigation.module.css"

function Navigation(props){
	return(
		<nav className={styles.container}>
			<CustomLink to="/">Home</CustomLink>
			<CustomLink to="calendar/">Calendar</CustomLink>
			<CustomLink to="settings/">Settings</CustomLink>
			Stats
		</nav>
		)
}

export default Navigation