import React from "react"
import styles from "./Button.module.css"
function Button({className, children, style, onClick, type}){
	return <button 
			type={type}
			onClick={onClick} 
			className={className + ' ' + styles.button} 
			style={style}>
				{children}
			</button>
}

export default Button