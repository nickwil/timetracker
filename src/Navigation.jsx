import React from "react";
import CustomLink from "./general/CustomLink.jsx";
import styles from "./Navigation.module.css";
import store from "./stores/store.js";
import shortTimeFormatting from "./util/shortTimeFormatting.js";

function Navigation(props) {
  return (
    <nav className={styles.container}>
      <CustomLink to="/">
        Home - {shortTimeFormatting(store.getTimeToSpendForDay())}
      </CustomLink>
      <CustomLink to="/calendar/">Calendar</CustomLink>
      <CustomLink to="/settings/">Settings</CustomLink>
      <CustomLink to="/stats/">Stats</CustomLink>
    </nav>
  );
}

export default Navigation;
