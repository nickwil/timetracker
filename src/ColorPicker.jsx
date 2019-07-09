import React from "react"

function ColorPicker({setColor, color}){
	const [colorVal, update] = React.useState(color)

	const onChange = (color) => {
		update(color)
		setColor(color)
	}
	return <input 
		   onChange={(e) => onChange(e.target.value)}
		   type="color" 
           value={colorVal}/>
}

export default ColorPicker