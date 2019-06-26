import React from "react"
import tagStore from "./tagStore.js"
import { observer } from 'mobx-react-lite'

const TagsInput = observer(function TagsInput(props){
	return(<div>
				{
					tagStore.tags.map((tag) => 
						<Tag name={tag.name}
						canDelete={tag.canDelete} 
						deleteTag={() => 
						tagStore.deleteTag(tag.id)}/>)
				}
				
				<TagForm/>
			</div>)
})
// modal should appear to confirm deletion
// what if the tag I'm using no longer exists?
// Other cannot be deleted
const Tag = observer(function Tag({name, canDelete, deleteTag}){
	return (
			<span>
				{name} 
				{
					canDelete ?

					<button 
					onClick={()=> deleteTag()}>
					X
					</button> 
					:
					null
				}
			</span>)
})
function TagForm({updateTags}){
	const [value, onChange] = React.useState("")

	const onEnter = (e) => {
		if (e.key === 'Enter' && value != '') {
		      tagStore.addTag(value)
		      onChange("")

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