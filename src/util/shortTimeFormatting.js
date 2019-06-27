function shortTimeFormatting(time){
	// time is given in seconds
	const seconds = "s"
	const minutes = "m"
	const hours = "h"

	var newTime = time
	console.log("seconds")
	
	if(time <= 60){
		return time + seconds
	} 
	else if (time < 3600) {
		return Math.round(time / 60) + minutes
	} else if (time >= 3600){
		return Math.round(time / 3600) + hours
	} else {
		return newTime = time + seconds
	}

	return newTime
	
	
}
export default shortTimeFormatting