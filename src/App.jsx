import React from "react";
import { Router } from "@reach/router";
import Home from "./main/Home.jsx";
import DateHome from "./main/DateHome.jsx"
import Calendar from "./calendar/Calendar.jsx";
import store from "./stores/store.js";
import Settings from "./settings/Settings.jsx";
import Navigation from "./Navigation.jsx";
import tagStore from "./stores/tagStore.js";
import DateStats from "./stats/DateStats.jsx";
import { observer } from "mobx-react-lite";
import { timeStore } from "./stores/store.js";

const App = observer(function App(props) {
  return (
    <section>
      <header>
        <Navigation store={store}/>
      </header>
      <Router>
        <Home timeStore={timeStore} store={store} dayFromUrl={new Date().getTime()} path="/" />
        <DateHome timeStore={timeStore} store={store} path="/:year/:month/:day" />

        <Settings store={store} tagStore={tagStore} path="settings/" />
        <DateStats store={store} tagStore={tagStore}  path="stats/" />
        <DateStats store={store} tagStore={tagStore} path="stats/:year/:month/:week" />
        <DateStats store={store} tagStore={tagStore} path="stats/:year/:month" />
        <DateStats store={store} tagStore={tagStore} path="stats/:year" />
        <Calendar store={store} path="calendar/" />
        <Calendar store={store} path="calendar/:year/:monthNo"/>
      </Router>
    </section>
  );
});


export default App;
