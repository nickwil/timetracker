import React from "react";
import styles from "./ItemTime.module.css";
import { observer } from "mobx-react-lite";
import shortTimeFormatting from "../../util/shortTimeFormatting.js";

// change time to format it always to be 2 numbers
const ItemTime = observer(function ItemTime({ time, changeIfCounting, id, timeStore }) {
  return (
    <span>
      <button
        onClick={() => timeStore.reverseCounting(id)}
        className={styles.time}
      >
        {shortTimeFormatting(time)}
      </button>
    </span>
  );
});

export default ItemTime;
