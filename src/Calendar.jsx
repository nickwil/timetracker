import React, {useState} from 'react';
import "./Calendar.css"
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
	
	
	return (<div>
			<button onClick={() => previousMonth()}>Go back</button>
			<button onClick={() => nextMonth()}>Go to next</button>
			<h4>Month: {moment(month).format("MMMM YYYY")}</h4>
			<div className="week">
			<span className="dayOfWeek">Sun</span>
			<span className="dayOfWeek">Mon</span>
			<span className="dayOfWeek">Tues</span>
			<span className="dayOfWeek">Wed</span>
			<span className="dayOfWeek">Thurs</span>
			<span className="dayOfWeek">Fri</span>
			<span className="dayOfWeek">Sat</span>
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
		return <div className="week">{props.days}{extraDays}</div>
	} else {
		return <div className="week">{extraDays}{props.days}</div>
	}
	
}


function EmptyDay(props){
	
	return <span></span>
}
function Day(props){
	return (
		<span class="day">
		<button	onClick={
				() => props.changeDay(Number(moment(`${props.month}-${props.number}`, "YYYY-MM-DD").format("x")))
			}>
			{props.number}
			</button>
	</span>)
}

export default Calendar