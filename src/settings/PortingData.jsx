import React from "react";
import store from "../stores/store.js";
function PortingData(props) {
  const [value, update] = React.useState("");
  return (
    <div>
      Data: <textarea value={props.data} />
      Import: <textarea onChange={e => update(e.target.value)} value={value} />
      <button onClick={() => store.setItems(store.importItemsData(value))}>
        Import
      </button>
    </div>
  );
}
export default PortingData;
