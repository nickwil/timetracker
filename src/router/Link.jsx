
import React, { useContext, useEffect } from 'react'

function Link({title, location, updateLocation}) { 
	const update = (e) => {
		e.preventDefault()
		updateLocation(location)
	}
  return <a onClick={(e) => update(e)}href={location}>{title}</a>
}
export default Link