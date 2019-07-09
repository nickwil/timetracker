import React from "react"
import PieChart from 'react-minimal-pie-chart';
import store from "./store.js"
import shortTimeFormatting from "./util/shortTimeFormatting.js"
import { observer } from 'mobx-react-lite'

const colors = ["#E38627", '#C13C37', '#6A2135']
const Stats = observer(function Stats({data}){
	return (<div>
		<h4>Time Spent Working</h4>
		<PieChart 
		  style={{height: '400px'}}
		  lineWidth={15}
  data={data}
  paddingAngle={18}
  rounded
  label={({ data, dataIndex }) =>
        shortTimeFormatting(data[dataIndex].value)
      }
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif'
  }}
  labelPosition={60}
/>
<section>
	<h4>Legend Tags</h4>
	{
		data.map((obj)=> <div>{obj.title} - <span style={{color: obj.color}}>•</span></div>)
	}
</section>
{
  /*have a bunch of links to:
    - months
    - weeks
    - years

    get all the years in an array
    get all the month year pairings in an array
    get all the monhth year week pairings in an array*/
}
</div>)
})
export default Stats