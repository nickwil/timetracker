import React from 'react'
import store from '../stores/store.js'
import Button from "../general/Button.jsx"
import styles from "./PortingData.module.css"

function PortingData(props) {
  const [value, update] = React.useState('')
  return (
    <section>
      <h2>Import/Export Data</h2>
      <label htmlFor="export-data-area">Data:</label>
      <textarea value={props.data} readOnly id="export-data-area" />
      <form
        onSubmit={e => {
          e.preventDefault()
          store.setItems(store.importItemsData(value))
        }}
      >
        <label htmlFor="import-data-area">Import:</label>
        <textarea
          value={value}
          id="import-data-area"
          onChange={e => update(e.target.value)}
        />
        <Button className={styles.spacing} type="submit">Import</Button>
      </form>
    </section>
  )
}
export default PortingData
