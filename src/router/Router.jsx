import React from "react"
import { createBrowserHistory } from 'history';


function Router(props){
	const history = createBrowserHistory();

	 const [location, updateLocation] = React.useState(history.location.pathname)


	 const update = (route) => {
	 	console.log("called updated")
	 	history.push(route);
	 	updateLocation(route)
	 }

	 // need to listen to going back using history and useEffect and cleanup



/* 

You'll know when updates happen due to link

Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
});
*/
// Use push, replace, and go to navigate around.
//

// To stop listening, call the function returned from listen().
//unlisten();

	// ISSUE: Onlu immediate children links will work
	const renderChildren = () => {
		  return React.Children.map(props.children, child => {
		  	// add it so it can match other stuff too
		  	const show = child.props.route == location
		    return React.cloneElement(child, {
		      show: show,
		      updateLocation: update

		    })
		  })
		}
	return (<React.Fragment>
				{
					renderChildren()
				}
			</React.Fragment>)
}



export default Router