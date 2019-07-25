import React from "react"
import CustomLink from "../general/CustomLink.jsx";
import styles from "./Calendar.module.css";

const moment = require("moment");

function Day({store, month, number}) {
  var day = moment(`${month}-${number}`, "YYYY-MM-DD").format(
    "YYYY/MM/DD"
  );
  console.log(store)
  const timeForDay = store.getTimeToSpendForDay(day);
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
}

function colorsForDays(time) {
  if (time > 3600) {
    return { color: `darkred` };
  } else {
    return { color: `red` };
  }
}
export default Day