import React from "react";
import Tags from "../Tags.jsx";
import ItemTime from "./ItemTime.jsx";
import ItemMenuContainer from "./ItemMenu.jsx";
import { observer } from "mobx-react-lite";
import tagStore from "../../stores/tagStore.js";
import shortTimeFormatting from "../../util/shortTimeFormatting.js";

import styles from "./ItemList.module.css";
const ItemList = observer(function ItemList({ store, item, tags, timeStore }) {
  const checkItem = () => {
    if(timeStore.selectedItem === item.id){
      return styles.container + " " + styles.outline
    } else {
      return styles.container
    }
  }
  const storeItem = store.items[store.index(item.id)];
  return (
    <div className={checkItem()}>
      { item.completed?
        shortTimeFormatting(item.length)
        :
        <ItemTime timeStore={timeStore} id={item.id} time={item.tilCompletion} />
      }

      <input
        placeholder="Add description..."
        data-testid={"item-input-descrip:" + item.id}
        className={styles.input + ' ' + styles.shouldBeHidden}
        value={item.text}
        onChange={e => storeItem.updateText(e.target.value)}
      />
      <span className={styles.tagsAndDot}>
        <span
          style={{ color: tagStore.tags[tagStore.index(item.tagId)].color }}
        >
          •
        </span>
        <Tags
          onChange={tag => storeItem.updateTag(tag)}
          defaultTagId={item.tagId}
          tags={tags}
        />
      </span>
      <ItemMenuContainer store={store} id={item.id} />
    </div>
  );
});

export default ItemList;
