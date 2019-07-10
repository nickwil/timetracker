import React, { useState } from "react";
import "./App.css";
import Timer from "./Timer.jsx";
import Calendar from "../calendar/Calendar.jsx";
import AddItemModal from "./AddItemModal.jsx";

import { observer } from "mobx-react-lite";
import CustomLink from "../general/CustomLink.jsx";

import { date } from "../util/quick.js";
import { timeStore } from "../stores/store.js";
import tagStore from "../stores/tagStore.js";
import ItemList from "./ItemList.jsx";

const App = observer(function App({ store, dayFromUrl }) {
  // always have value in store to day from url
  store.updateDate(dayFromUrl);
  return (
    <div className="App">
      <header className="App-header">
        <p id="currentDate">
          <CustomLink to="/calendar"> {date(new Date(dayFromUrl))}</CustomLink>
        </p>
        <Timer />
      </header>

      <section>
        <h4>Remaining</h4>

        {store.unCompletedTodos.map(obj => (
          <ItemList item={obj} store={store} tags={tagStore.tags} />
        ))}
      </section>

      <section>
        <h4>Completed </h4>
        {store.completedTodos.map(obj => (
          <ItemList item={obj} store={store} tags={tagStore.tags} />
        ))}
      </section>
      <AddItemModal addTask={store.addItem} />
    </div>
  );
});

export default App;
