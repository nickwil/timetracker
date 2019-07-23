import React from "react";
import { Router } from "@reach/router";
import Home from "./main/Home.jsx";
import DateHome from "./main/DateHome.jsx"
import Calendar from "./calendar/Calendar.jsx";
import Stats from "./stats/Stats.jsx";
import store from "./stores/store.js";
import { date } from "./util/quick.js";
import Settings from "./settings/Settings.jsx";
import Navigation from "./Navigation.jsx";
import tagStore from "./stores/tagStore.js";
import MonthStats from "./stats/MonthStats.jsx";
import YearStats from "./stats/YearStats.jsx";
import WeekStats from "./stats/WeekStats.jsx";
import { observer } from "mobx-react-lite";
import { timeStore } from "./stores/store.js";

const App = observer(function App(props) {
  return (
    <section>
      <header>
        <Navigation />
      </header>
      <Router>
        <Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} path="/" />
        <DateHome timeStore={timeStore} store={store} path="/:year/:month/:day" />

        <Settings store={store} tagStore={tagStore} path="settings/" />
        <Stats data={store.getTimeFromEachTag(tagStore.tags)} path="stats/" />
        <WeekStats path="stats/:year/:month/:week" />
        <MonthStats path="stats/:year/:month" />
        <YearStats path="stats/:year" />
        <Calendar path="calendar/" />
        <Calendar path="calendar/:year/:monthNo"/>
      </Router>
    </section>
  );
});


export default App;
