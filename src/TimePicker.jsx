import React from "react"

function TimePicker(props){
	const [hours, updateHours] = React.useState()
	const [seconds, updateSeconds] = React.useState()
	// if more than two make red 

	var hoursStyle = null
	if(hours != undefined){
		if(hours.length > 2 || hours > 12){
			hoursStyle={backgroundColor : `red`}
		} 
	}

	var secondStyle = null
	if(seconds != undefined){
		if(seconds.length > 2){

		}
	}
	return (<span>
				<input 
				style={hoursStyle}
				onChange={(e) => updateHours(e.target.value)}
				autocomplete="off"  max="12" min="1" placeholder="--" type="number" value={hours}/>
				:
				<input onChange={(e) => updateSeconds(e.target.value)}
				autocomplete="off"  max="59" min="0" placeholder="--" type="number" value={seconds}/>
				<select>
					<option>AM</option>
					<option>PM</option>
				</select>
			</span>)
}
export default TimePicker