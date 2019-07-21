import React from "react"
import CustomLink from "../general/CustomLink.jsx";
import styles from "./Calendar.module.css";
import store from "../stores/store.js";

const moment = require("moment");

function Day(props) {
  var day = moment(`${props.month}-${props.number}`, "YYYY-MM-DD").format(
    "YYYY/MM/DD"
  );
  const timeForDay = store.getTimeToSpendForDay(day);
  return (
    <span className={styles.day}>
      
      {
      	timeForDay > 0 ? <CustomLink  style={colorsForDays(timeForDay)} className={styles.dayButton} to={`/${day}`}>
        {props.number}
      </CustomLink> : <CustomLink className={styles.dayButton} to={`/${day}`}>
        {props.number}
      </CustomLink>
  	  }
    </span>
  );
}

function colorsForDays(time) {
  console.log(time >= 3600 && time < 7000);
  if (time > 3600) {
    return { color: `darkred` };
  } else {
    return { color: `red` };
  }
}
export default Day