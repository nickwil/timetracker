import React from "react";
import store from "../stores/store.js";
function PortingData(props) {
  const [value, update] = React.useState("");
  return (
    <section>
      <h2>Import/Export Data</h2>
      <label for="export-data-area" >Data:</label> 
      <textarea id="export-data-area">{props.data}</textarea>
      <form onSubmit={(e) => {
        e.preventDefault()
        store.setItems(store.importItemsData(value))
      }}>
        <label for="import-data-area" >Import:</label>
        <textarea id="import-data-area" onChange={e => update(e.target.value)}>{value}</textarea>
        <input value="Import" type="submit"/>
      </form>
    </section>
  );
}
export default PortingData;
