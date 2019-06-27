import React from "react"

function TimePicker({onChange}){
	
	const [hours, updateHours] = React.useState("")
	const [seconds, updateSeconds] = React.useState("")
	const [isMorning, updateTimeOfDay] = React.useState('AM')
	// if more than two make red 

	var hoursStyle = null
	if(hours != undefined){
		if(hours.length > 2 || hours > 12){
			hoursStyle={backgroundColor : `red`}
		} 
	}

	var secondStyle = null
	if(seconds != undefined){
		if(seconds.length > 2 || seconds > 59){
			secondStyle={backgroundColor : `red`}
		} 
	}
	const handleChange = (time, callback) => {

		callback(time)
		console.log(time)
		if(isMorning == 'AM'){
			onChange(hours+":"+seconds)
		} else {
			onChange((Number(hours)+12)+":"+seconds)
		}
	}


	return (<span>
				<input 
				style={hoursStyle}
				onChange={(e) => handleChange(e.target.value, updateHours)}
				autocomplete="off"  max="12" min="1" 
				placeholder="--" 
				type="number" value={hours}/>
				:
				<input 
				style={secondStyle}
				onChange={(e) => handleChange(e.target.value, updateSeconds)}
				autocomplete="off"  max="59" min="0" 
				placeholder="--" 
				type="number" value={seconds}/>
				<select onChange={(e) => handleChange(e.target.value, updateTimeOfDay)}>
				
						<option>AM</option>
						<option>PM</option>
					
					
					
				</select>
			</span>)
}
export default TimePicker