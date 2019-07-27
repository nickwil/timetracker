import React from "react";
import CustomLink from "../general/CustomLink.jsx"
import styles from "./Calendar.module.css";
import Week from "./Week.jsx"
import Day from "./Day.jsx"
import CheckDateOops from "../general/CheckDateOops.jsx"
import { observer } from "mobx-react-lite";

const moment = require("moment");
const Calendar = observer(function Calendar({year, monthNo, store}) {
  var momentObject = moment()
      .startOf("month")
      .format("YYYY-MM");
  if(year && monthNo){
    momentObject = moment(`${year}-${monthNo}`, "YYYY-MM")
      .startOf("month")
      .format("YYYY-MM")
  }
  React.useEffect(() => {
     var momentObject = moment()
      .startOf("month")
      .format("YYYY-MM");
  if(year && monthNo){
    momentObject = moment(`${year}-${monthNo}`, "YYYY-MM")
      .startOf("month")
      .format("YYYY-MM")
  }
  changeMonth(momentObject)
  })
  const [month, changeMonth] = React.useState(
    momentObject
  );

  var calDay = moment(month).startOf("month");
  var numberOfDaysInMonth = moment(month).daysInMonth();

  const createCalendar = () => {
    var dates = [];
    var week = [];

    var weekNumber = 1;
    for (var i = 0; i < numberOfDaysInMonth; i++) {
      if (calDay.format("dddd") === "Sunday") {
        dates.push(<Week store={store} month={month} weekNumber={weekNumber} days={week} />);
        week = [];
        weekNumber += 1;
      }
      week.push(
        <Day
          store={store}
          year={calDay.format("YYYY")}
          month={month}
          dayOfWeek={calDay.format("dddd")}
          number={calDay.get("date")}
        />
      );
      calDay.add(1, "days").calendar();
    }
    // last week if doesn't end in a sunday
    dates.push(<Week store={store} month={month} days={week} />);
    return dates;
  };
  const checkDateOverride = () => {
    if(year === undefined && monthNo === undefined){
      return true
    } else {
      return false
    }
  }

  return (
    <CheckDateOops override={checkDateOverride()}date={`${year}-${monthNo}`}>
    <div className={styles.container}>
      <h1>Month: {moment(month).format("MMMM YYYY")}</h1>
      <div className={styles.mainCal}>
        <div className={styles.linksToMove}>
          <CustomLink className={styles.roundedButton} to={"/calendar/" + moment(month).subtract(1, "month").format("YYYY/MM")}>Go back a month</CustomLink>
          <CustomLink className={styles.roundedButton} to={"/calendar/" + moment(month).add(1, "month").format("YYYY/MM")}>Go to next month</CustomLink>
        </div>
        <div className={styles.week}>
          <span className={styles.dayOfWeek}>Sun</span>
          <span className={styles.dayOfWeek}>Mon</span>
          <span className={styles.dayOfWeek}>Tue</span>
          <span className={styles.dayOfWeek}>Wed</span>
          <span className={styles.dayOfWeek}>Thu</span>
          <span className={styles.dayOfWeek}>Fri</span>
          <span className={styles.dayOfWeek}>Sat</span>
        </div>
        {createCalendar()}
      </div>
    </div>
    </CheckDateOops>
  );
})



export default Calendar;
