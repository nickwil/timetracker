import React from "react"
import CustomLink from "../general/CustomLink.jsx";
import styles from "./Calendar.module.css";
import { observer } from "mobx-react-lite";

const moment = require("moment");

const Day = observer(function Day({store, month, number}) {
  var day = moment(`${month}-${number}`, "YYYY-MM-DD").format(
    "YYYY/MM/DD"
  );
  const timeForDay = store.getTimeToSpendForDay(day);
  console.log(timeForDay)
  return (
    <span className={styles.day}>
      
      {
      	timeForDay > 0 ? <CustomLink  style={colorsForDays(timeForDay)} className={styles.dayButton} to={`/${day}`}>
        {number}
      </CustomLink> : <CustomLink className={styles.dayButton} to={`/${day}`}>
        {number}
      </CustomLink>
  	  }
    </span>
  );
})

function colorsForDays(time) {
  if (time > 3600) {
    return { color: `darkred` };
  } else {
    return { color: `red` };
  }
}
export default Day