import React from "react"
function CheckDateOops({children, date}){
  if(isNaN(new Date(date).getTime())){
    return <h1>Oops, that's not a date!</h1>
  } else {
    return children
  }
}

export default CheckDateOops