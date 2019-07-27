import React from "react";
import TagsInput from "./TagsInput.jsx";
import PortingData from "./PortingData.jsx";
import {removeDataFromLocalStorage} from "../stores/store.js"
import styles from "./Settings.module.css"
function Settings({tagStore, store}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.headTitle}>Settings</h1>
      
        <TagsInput tagStore={tagStore}/>
        <PortingData data={store.exportItemsData} />
        <button onClick={()=> {
        	store.setItems([])
        	tagStore.setToDefault()
          removeDataFromLocalStorage()
        }}>Reset data</button>
      
    </div>
  );
}

export default Settings;