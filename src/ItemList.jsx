import React from "react"
import Tags from "./Tags.jsx"
import Input from "./Input.jsx"
import ItemTime from "./ItemTime.jsx"
import ItemMenu from "./ItemMenu.jsx"
import { observer } from 'mobx-react-lite'

import styles from "./ItemList.module.css"
const ItemList = observer(function ItemList({store, item, tags}){
	const storeItem = store.items[store.index(item.id)]
	return <div className={styles.container}>
			  <ItemTime id={item.id} time={item.tilCompletion}/>

              <Input styles={styles.input} text={item.text} id={item.id} 
              onTaskChange={(text) => storeItem.updateText(text)}/>

              <Tags 
              onChange={(tag) => storeItem.updateTag(tag)} 
              defaultTagId={item.tagId} tags={tags}/>

              <ItemMenu
              store={store}
              id={item.id}/>
           </div>
})
export default ItemList