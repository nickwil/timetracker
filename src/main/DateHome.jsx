import React from "react";
import Home from "./Home.jsx"
function DateHome({ store,timeStore, year, month, day }) {
  console.log(new Date(year + "/" + month + "/" + day).getTime());
  return (
    <Home
    timeStore={timeStore}
      dayFromUrl={new Date(year + "/" + month + "/" + day).getTime()}
      store={store}
    />
  );
}
export default DateHome