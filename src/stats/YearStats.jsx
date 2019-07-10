import React from "react";
import Stats from "./Stats.jsx";

import store from "../stores/store.js";
import tagStore from "../stores/tagStore.js";
import { observer } from "mobx-react-lite";

const YearStats = observer(function YearStats({ year }) {
  const items = store.completedTodosFromYear(year);
  console.log(items);
  return <Stats data={store.getTimeFromEachTag(tagStore.tags, items)} />;
});
export default YearStats;