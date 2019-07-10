import React from "react";
import Tags from "../Tags.jsx";
import Input from "../../general/Input.jsx";
import ItemTime from "./ItemTime.jsx";
import ItemMenuContainer from "./ItemMenu.jsx";
import { observer } from "mobx-react-lite";
import tagStore from "../../stores/tagStore.js";
import shortTimeFormatting from "../../util/shortTimeFormatting.js";

import styles from "./ItemList.module.css";

const ItemList = observer(function ItemList({ store, item, tags }) {
  const storeItem = store.items[store.index(item.id)];
  return (
    <div className={styles.container}>
      { item.completed?
        shortTimeFormatting(item.length)
        :
        <ItemTime id={item.id} time={item.tilCompletion} />
      }

      <Input
        styles={styles.input}
        text={item.text}
        id={item.id}
        onTaskChange={text => storeItem.updateText(text)}
      />
      <span>
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
