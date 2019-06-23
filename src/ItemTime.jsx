import React from "react"
import styles from "./ItemTime.module.css"
// change time to format it always to be 2 numbers
function ItemTime({time, changeIfCounting, id}){
	return <span >
				<button onClick={() => changeIfCounting(true, id)} className={styles.time}>{time}s</button>

				</span>
}

export default ItemTime