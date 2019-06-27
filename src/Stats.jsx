import React from "react"
import PieChart from 'react-minimal-pie-chart';
import store from "./store.js"
function Stats(props){
	return (<div>
		<h4>Time Spent Working</h4>
		<PieChart 
		  style={{height: '400px'}}
		  lineWidth={15}
  data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]}
/></div>)
}
export default Stats