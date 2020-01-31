import React from "react";
import styles from "./ItemMenu.module.css";
import CustomModal from "../../general/CustomModal.jsx"
import Button from "../../general/Button.jsx"
function ItemMenuContainer({ store, id }) {
  // if small view then have 3 dots and use modal if not then just display it there
  // if small view then show 3 dots, and use modal

  // use CSS media query to show or hide
  const storeItem = store.items[store.index(id)];

  return (
    <React.Fragment>
      <span className={styles.container}>
        <ItemMenu data_testid_for_input={"normal-item-menu-input:"+id} store={store} id={id} />
      </span>
      <CustomModal
      modalText=":"
      data_button_test_id={"item-menu:"+id}
        id={id}
        children={<div><ItemMenu 
          data_testid_for_input={"modal-item-menu-input:"+id} store={store} id={id} /></div>}
        className={styles.modalContainer}
        storeItem={storeItem}
      />
    </React.Fragment>
  );
}

function ItemMenu({ store, id, data_testid_for_input }) {
  const storeItem = store.items[store.index(id)];

  return (
    <span className={styles.grouping}>
      <Button className={styles.leftMost} onClick={() => store.deleteItem(id)}>Delete</Button>
      <label style={{fontWeight: 300}}>Task Time:<input
      data-testid={data_testid_for_input}
        type="number"
        value={storeItem.tilCompletion}
        onChange={e => storeItem.updateLengthOfTask(Number(e.target.value))}
        placeholder="change time for task"
      /></label>
        <input
        placeholder="Add description for task..."
        data-testid={"item-input-modal-descrip:" + storeItem.id}
        className={styles.shouldBeHidden}
        value={storeItem.text}
        id={storeItem.id}
        onChange={e => storeItem.updateText(e.target.value)}
      />
      <Button className={styles.rightMost} onClick={() => storeItem.updateTimeTilCompletion(storeItem.tilCompletion)}>Mark as completed</Button>
    </span>
  );
}

export default ItemMenuContainer;
