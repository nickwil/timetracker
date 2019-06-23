import React from "react"
import Tags from "./Tags.jsx"
import Input from "./Input.jsx"
import ItemTime from "./ItemTime.jsx"
function ItemList({store, item, changeIfCounting, tags}){
	return <div className={styles.container}>
			  <ItemTime id={item.id} changeIfCounting={changeIfCounting} time={item.tilCompletion}/>
              <Input styles={styles.input} text={item.text} id={item.id} 
              onTaskChange={(text) => store.items[store.index(item.id)].updateText(text)}/>
              <Tags 
              onChange={(tag) => store.items[store.index(item.id)].updateTag(tag)} 
              defaultTagId={item.tagId} tags={tags}/>
           </div>
}
export default ItemList