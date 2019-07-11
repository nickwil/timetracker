import React, { useState } from "react";
import styles from "./Calendar.module.css";
import Week from "./Week.jsx"
import Day from "./Day.jsx"
import store from "../stores/store.js";
const moment = require("moment");
function Calendar(props) {
  const [month, changeMonth] = React.useState(
    moment()
      .startOf("month")
      .format("YYYY-MM")
  );

  var calDay = moment(month).startOf("month");
  var numberOfDaysInMonth = moment(month).daysInMonth();

  const previousMonth = () => {
    const newMonth = moment(month)
      .subtract(1, "month")
      .format("YYYY-MM");
    changeMonth(newMonth);

    calDay = moment(newMonth).startOf("month");
    numberOfDaysInMonth = calDay.daysInMonth();
  };

  const nextMonth = () => {
    const newMonth = moment(month)
      .add(1, "month")
      .format("YYYY-MM");
    changeMonth(newMonth);

    calDay = moment(newMonth).startOf("month");
    numberOfDaysInMonth = calDay.daysInMonth();
  };

  const createCalendar = () => {
    var dates = [];
    var week = [];

    var weekNumber = 1;
    for (var i = 0; i < numberOfDaysInMonth; i++) {
      if (calDay.format("dddd") == "Sunday") {
        dates.push(<Week month={month} weekNumber={weekNumber} days={week} />);
        week = [];
        weekNumber += 1;
      }
      week.push(
        <Day
          year={calDay.format("YYYY")}
          month={month}
          dayOfWeek={calDay.format("dddd")}
          number={calDay.get("date")}
        />
      );
      calDay.add(1, "days").calendar();
    }
    // last week if doesn't end in a sunday
    dates.push(<Week month={month} days={week} />);
    return dates;
  };

  return (
    <div className={styles.container}>
      <button onClick={() => previousMonth()}>Go back</button>
      <button onClick={() => nextMonth()}>Go to next</button>
      <h4>Month: {moment(month).format("MMMM YYYY")}</h4>
      <div className={styles.week}>
        <span className={styles.dayOfWeek}>Sun</span>
        <span className={styles.dayOfWeek}>Mon</span>
        <span className={styles.dayOfWeek}>Tues</span>
        <span className={styles.dayOfWeek}>Wed</span>
        <span className={styles.dayOfWeek}>Thurs</span>
        <span className={styles.dayOfWeek}>Fri</span>
        <span className={styles.dayOfWeek}>Sat</span>
      </div>
      {createCalendar()}
    </div>
  );
}



export default Calendar;
