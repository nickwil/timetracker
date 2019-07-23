import React from "react";
import TagsInput from "./TagsInput.jsx";
import ColorPicker from "./ColorPicker.jsx";
import PortingData from "./PortingData.jsx";
import store from "../stores/store.js";
function Settings({tagStore, store}) {
  return (
    <div>
      <h1>Settings</h1>
      
        <TagsInput tagStore={tagStore}/>
        <PortingData data={store.exportItemsData} />
        <button>modify tags</button>
        <button>Export data</button>
        <button>Reset data</button>
      
    </div>
  );
}

export default Settings;
