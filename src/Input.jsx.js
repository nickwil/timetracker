import React from "react"
class Input extends React.Component {

  state = {text: this.props.text}
  onChange(e){
    this.setState({text: e.target.value})
    this.props.onTaskChange(e.target.value)
  }
  render(){
    return <input className={this.props.styles} onChange={(e) => this.onChange(e)} value={this.state.text}/>
  }
}
export default Input