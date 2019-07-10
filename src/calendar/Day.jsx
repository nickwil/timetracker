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
      <CustomLink className={styles.dayButton} to={`/${day}`}>
        {props.number}
      </CustomLink>
      {
      	timeForDay > 0 ? <span style={colorsForDays(timeForDay)}>•</span> : null
  	  }
    </span>
  );
}

function colorsForDays(time) {
  console.log(time >= 3600 && time < 7000);
  if (time > 3600) {
    return { color: `red` };
  } else {
    return { color: `green` };
  }
}
export default Day