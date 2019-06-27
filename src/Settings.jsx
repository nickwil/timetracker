import React from "react"
import TagsInput from "./TagsInput.jsx"
function Settings(props){
	
	return (
			<div>
				<h4>Settings</h4>
				<ul>
					<TagsInput/>
					<button>modify tags</button>
					<button>Export data</button>
					<button>Reset data</button>
				</ul>
			</div>
			)
}

export default Settings