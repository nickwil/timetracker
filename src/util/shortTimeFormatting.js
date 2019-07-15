function shortTimeFormatting(time){
	// time is given in seconds
	const seconds = "s"
	const minutes = "m"
	const hours = "h"

	
	if(time <= 60){
		return time + seconds
	} 
	else if (time < 3600) {
		return Math.round((time / 60) * 10) / 10 + minutes
	} else if (time >= 3600){
		return Math.round((time / 3600) * 10) / 10 + hours
	}

	return time
	
	
}
export default shortTimeFormatting