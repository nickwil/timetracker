import React, { useState } from "react";
import "./Home.css";
import Timer from "./Timer.jsx";
import Calendar from "../calendar/Calendar.jsx";
import AddItemModal from "./AddItemModal.jsx";
import CheckDateOops from "../general/CheckDateOops.jsx"
import { observer } from "mobx-react-lite";
import CustomLink from "../general/CustomLink.jsx";

import { date } from "../util/quick.js";
import { timeStore } from "../stores/store.js";
import tagStore from "../stores/tagStore.js";
import ItemList from "./item/ItemList.jsx";

const Home = observer(function Home({ store, dayFromUrl }) {
  // always have value in store to day from url
  store.updateDate(dayFromUrl);
  return (
    <CheckDateOops date={dayFromUrl}>
      <div className="App">
        <header className="App-header">
          <p id="currentDate">
            <CustomLink to="/calendar"> {date(new Date(dayFromUrl))}</CustomLink>
          </p>
          <Timer />
        </header>

        <section aria-labelledby="remaining-header">
          <h4 id="remaining-header">Remaining</h4>
          {store.unCompletedTodos.map(obj => (
              <ItemList item={obj} store={store} tags={tagStore.tags} />
            ))}
        </section>

        <section aria-labelledby="completed-header">
          <h4 id="completed-header">Completed</h4>
          {store.completedTodos.map(obj => (
              <ItemList item={obj} store={store} tags={tagStore.tags} />
            ))}
        </section>
        <AddItemModal addTask={store.addItem} />
      </div>
    </CheckDateOops>
  );
});

export default Home;
