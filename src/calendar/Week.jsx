import React from "react"
import styles from "./Calendar.module.css";

function Week({weekNumber, days}) {
  // if week isn't full add empty days
  var extraDays = [];
  if (days.length < 7) {
    while (days.length + extraDays.length < 7) {
      extraDays.push(<EmptyDay dayOfWeek="" />);
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
function EmptyDay(props) {
  return <span></span>;
}

export default Week