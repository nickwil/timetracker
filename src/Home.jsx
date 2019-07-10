import React from "react";
import { Router } from "@reach/router";
import App from "./main/App.js";
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

const Home = observer(function Home(props) {
  return (
    <section>
      <header>
        <Navigation />
      </header>
      <Router>
        <App store={store} dayFromUrl={new Date().getTime()} path="/" />
        <DateApp store={store} path="/:year/:month/:day" />

        <Settings path="settings/" />
        <Stats data={store.getTimeFromEachTag(tagStore.tags)} path="stats/" />
        <WeekStats path="stats/:year/:month/:week" />
        <MonthStats path="stats/:year/:month" />
        <YearStats path="stats/:year" />
        <Calendar path="calendar/" />
      </Router>
    </section>
  );
});

function DateApp({ store, year, month, day }) {
  console.log(new Date(year + "/" + month + "/" + day).getTime());
  return (
    <App
      dayFromUrl={new Date(year + "/" + month + "/" + day).getTime()}
      store={store}
    />
  );
}
export default Home;
