import React from "react";
import store from "../stores/store.js";
function PortingData(props) {
  const [value, update] = React.useState("");
  return (
    <section>
      <h2>Import/Export Data</h2>
      <label htmlFor="export-data-area" >Data:</label> 
      <textarea value={props.data} readOnly id="export-data-area"/>
      <form onSubmit={(e) => {
        e.preventDefault()
        store.setItems(store.importItemsData(value))
      }}>
        <label htmlFor="import-data-area" >Import:</label>
        <textarea value={value} id="import-data-area" onChange={e => update(e.target.value)}/>
        <input value="Import" type="submit"/>
      </form>
    </section>
  );
}
export default PortingData;
