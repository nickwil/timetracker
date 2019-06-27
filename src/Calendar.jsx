import React, {useState} from 'react';
import styles from "./Calendar.module.css"
import CustomLink from "./CustomLink.jsx"
import store from "./store.js"
const moment = require("moment")
function Calendar(props){
	const [month, changeMonth] = React.useState(moment().startOf('month').format("YYYY-MM"))

	var calDay = moment(month).startOf('month')	
	var numberOfDaysInMonth = moment(month).daysInMonth();
	
	const previousMonth = () => {
		const newMonth = moment(month).subtract(1, 'month').format("YYYY-MM")
		changeMonth(newMonth)

		calDay = moment(newMonth).startOf('month')
		numberOfDaysInMonth = calDay.daysInMonth()
		
	}

	const nextMonth = () => {
		const newMonth = moment(month).add(1, 'month').format("YYYY-MM")
		changeMonth(newMonth)

		calDay = moment(newMonth).startOf('month')
		numberOfDaysInMonth = calDay.daysInMonth()
	}
	
	const createCalendar = () => {
		
		var dates = []
		var week = []
		
		var weekNumber = 1
		for (var i = 0; i < numberOfDaysInMonth; i++) {
			if(calDay.format('dddd') == 'Sunday'){
				dates.push(<Week weekNumber={weekNumber} days={week}/>)
				week = []
				weekNumber += 1
			}
			week.push(<Day 
				year={calDay.format('YYYY')}
				month={month}
				currentDay={props.currentDay} changeDay={props.changeDay}
				dayOfWeek={calDay.format('dddd')} 
				number={calDay.get('date')}/>)
			calDay.add(1, 'days').calendar();
		}
		// last week if doesn't end in a sunday
		dates.push(<Week days={week}/>)
		return dates
	}
	
	
	return (<div className={styles.container}>
			<button onClick={() => previousMonth()}>Go back</button>
			<button onClick={() => nextMonth()}>Go to next</button>
			<h4>Month: {moment(month).format("MMMM YYYY")}</h4>
			<div className={styles.week}>
			<span className={styles.dayOfWeek}>Sun</span>
			<span className={styles.dayOfWeek}>Mon</span>
			<span className={styles.dayOfWeek}>Tues</span>
			<span className={styles.dayOfWeek}>Wed</span>
			<span className={styles.dayOfWeek}>Thurs</span>
			<span className={styles.dayOfWeek}>Fri</span>
			<span className={styles.dayOfWeek}>Sat</span>
			</div>
				{
					createCalendar()
				}
			</div>)
}
function Week(props){
	// if week isn't full add empty days
	var extraDays = []
	if (props.days.length < 7){
		while(props.days.length + extraDays.length < 7){
			extraDays.push(<EmptyDay dayOfWeek=""/>)
		}
	}
	if(props.weekNumber != 1){
		return <div className={styles.week}>{props.days}{extraDays}</div>
	} else {
		return <div className={styles.week}>{extraDays}{props.days}</div>
	}
	
}


function EmptyDay(props){
	
	return <span></span>
}
function Day(props){
	
	var day = moment(`${props.month}-${props.number}`, "YYYY-MM-DD").format("YYYY/MM/DD")
	return (
		<span className={styles.day}>
			<CustomLink	className={styles.dayButton} to={`/${day}`}>
				{props.number}
			</CustomLink>
			{
				// if there is time to spend for this day give it a red dot
				store.getTimeToSpendForDay(day) > 0 ?
				<span>reddot</span>
				:
				null
			}
			
		</span>)
}

export default Calendar