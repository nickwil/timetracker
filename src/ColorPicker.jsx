import React from "react"

function ColorPicker({setColor}){
	const [colorVal, update] = React.useState("#e66465")

	const onChange = (color) => {
		update(color)
	}
	return <input 
		   onChange={(e) => onChange(e.target.value)}
		   type="color" 
           value={colorVal}/>
}