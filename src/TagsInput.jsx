import React from "react"
import tagStore from "./tagStore.js"
function TagsInput(props){
	return(<div>
				<Tag name="School" 
				deleteTag={() => console.log("hey")}/>
				<TagForm updateTags={() => console.log("update tags")}/>
			</div>)
}
function Tag({name, deleteTag}){
	return <span>{name} <button onClick={()=> deleteTag()}>X</button> </span>
}
function TagForm({updateTags}){
	const [value, onChange] = React.useState("")

	const onEnter = (e) => {
		if (e.key === 'Enter') {
		     console.log('do validate');
		}
	}
	return(
				<input 
				onKeyDown={onEnter}
				onChange={(e) => onChange(e.target.value)} 
				value={value}/>
		)
}
export default TagsInput