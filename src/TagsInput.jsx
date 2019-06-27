import React from "react"
import tagStore from "./tagStore.js"
import CustomModal from "./CustomModal.jsx"
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
// TODO: modal should appear to confirm deletion DONE
const Tag = observer(function Tag({name, canDelete, deleteTag}){


	return (
			<span>
				{name} 
				{
					canDelete ?
					<CustomModal modalText="X" contentLabel="Delete tag">
						<span>
						Are you sure you want to delete the tag? Everything related to it will be set to Other.
							<button 
						onClick={()=> deleteTag()}>
						Delete tag
						</button> 
					</span>
					</CustomModal>
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