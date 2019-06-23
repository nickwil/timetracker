import React from "react"
import styles from "./ItemTime.module.css"
import {timeStore} from "./store.js"
import { observer } from 'mobx-react-lite'

// change time to format it always to be 2 numbers
const ItemTime = observer(function ItemTime({time, changeIfCounting, id}){
	return <span >
				<button onClick={() => timeStore.reverseCounting(id)} className={styles.time}>{time}s</button>

				</span>
})

export default ItemTime