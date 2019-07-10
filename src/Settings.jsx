import React from "react"
import TagsInput from "./TagsInput.jsx"
import ColorPicker from "./ColorPicker.jsx"
import PortingData from "./PortingData.jsx"
import store from "./store.js"
import tagStore from "./tagStore"
function Settings(props){
	
	return (
			<div>
				<h4>Settings</h4>
				<ul>
					<TagsInput/>
					<PortingData data={store.exportItemsData}/>
					<button>modify tags</button>
					<button>Export data</button>
					<button>Reset data</button>
				</ul>
			</div>
			)
}

export default Settings