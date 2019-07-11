import React from "react"
import styles from "./Calendar.module.css";
import Day from "./Day.jsx"
const moment = require("moment");

function Week({weekNumber, days, month}) {
  // if week isn't full add empty days
  var extraDays = [];
  if (days.length < 7) {
    var newMonth = moment(month)
      .subtract(1, "month")

      
    if(weekNumber == 1){
      // if it's the first week

      newMonth
      .endOf("month")
      .subtract(6 -  days.length, "day")
      console.log(newMonth)
    } else {
      newMonth
      .add(2, "month")
      .startOf("month")
      // if it's not the first week then this can only run in the last week
    }
    while (days.length + extraDays.length < 7) {
      console.log(newMonth.day())
      extraDays.push(<Day month={newMonth.format("YYYY-MM")} number={newMonth.date()} />);
      newMonth.add(1, "day")
    }
  }
  if (weekNumber != 1) {
    return (
      <div className={styles.week}>
        {days}
        {extraDays}
      </div>
    );
  } else {
    return (
      <div className={styles.week}>
        {extraDays}
        {days}
      </div>
    );
  }
}
function EmptyDay({dayOfWeek}) {
  return <span className={styles.day}>{dayOfWeek}</span>;
}

export default Week