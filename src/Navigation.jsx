import React from "react";
import CustomLink from "./general/CustomLink.jsx";
import styles from "./Navigation.module.css";
import shortTimeFormatting from "./util/shortTimeFormatting.js";
import { observer } from "mobx-react-lite";

const Navigation = observer(function Navigation({store}) {
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
})

export default Navigation;
