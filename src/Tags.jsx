import React from "react"
function Tags({tags, onChange, defaultTagId}){
	return (
				<select onChange={(e) => onChange(e.target.value)}>
				{
					tags.map((tag, index)=> <Tag tag={tag} defaultTagId={defaultTagId}/>)
				}
				  
				 </select>
		)
}
function Tag({tag, defaultTagId}){
	if(defaultTagId == tag.value){
		return <option selected="selected" value={tag.value}>{tag.name}</option>
	} else {

		return <option value={tag.value}>{tag.name}</option>
	}
}
export default Tags