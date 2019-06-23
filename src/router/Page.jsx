import React from "react"


function Page({path, component, show=true}){
	if(show){
		return component
	} else {
		return null
	}
}
export default Page