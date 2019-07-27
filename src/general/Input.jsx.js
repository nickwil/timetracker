import React from "react";
class Input extends React.Component {

  render() {
    return (
      <input
      {...this.props}
        className={this.props.styles}
        style={this.props.style}
        onChange={e => this.props.onTaskChange(e.target.value)}
        value={this.props.text}
      />
    );
  }
}
export default Input;
