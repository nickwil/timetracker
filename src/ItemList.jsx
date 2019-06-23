import React from "react"
import Tags from "./Tags.jsx"
import ItemTime from "./ItemTime.jsx"
function ItemList(props){
	return <div>
			  <ItemTime id={obj.id} changeIfCounting={changeIfCounting} time={obj.tilCompletion}/>
              <Input styles={styles.input} text={obj.text} id={obj.id} 
              onTaskChange={(text) => store.items[store.index(obj.id)].updateText(text)}/>
              <Tags 
              onChange={(tag) => store.items[store.index(obj.id)].updateTag(tag)} 
              defaultTagId={obj.tagId} tags={tags}/>
           </div>
}