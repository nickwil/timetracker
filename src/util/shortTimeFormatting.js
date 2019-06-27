function shortTimeFormatting(time){
	// time is given in seconds
	const seconds = "s"
	const minutes = "m"
	const hours = "h"
	switch(time){
		case time<=60:
			return time + seconds
			break;
		case time<3600:
			return Math.round(time / 60) + minutes
			break;
		case time >= 3600:
			return Math.round(time / 3600) + hours
			break;
	}	
	
	
}
export default shortTimeFormatting