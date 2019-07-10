import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import TimePicker from "./TimePicker.jsx";
import Tags from "./Tags.jsx";
import tagStore from "../stores/tagStore.js";
const moment = require("moment");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
function hmsToSeconds(fromTime, untilTime) {
  var start = getHourAndSeconds(fromTime);
  var end = getHourAndSeconds(untilTime);
  console.log(end.minutes, start.minutes);
  var hoursInSeconds = (end.hours - start.hours) * 60 * 60;
  var minutesInSeconds = (end.minutes - start.minutes) * 60;

  return hoursInSeconds + minutesInSeconds;
}

function getHourAndSeconds(time) {
  var timeArr = time.split(":");
  return {
    hours: Number(timeArr[0]),
    minutes: Number(timeArr[1])
  };
}
class AddItemModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      val: "",
      time: "",
      fromTime: "",
      untilTime: "",
      tag: "Other"
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(){
    if(this.state.time > 0){
      this.props.addTask(
                  this.state.val,
                  Number(this.state.time),
                  this.state.tag
      )
      this.closeModal()
    }


  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  updateText(text) {
    this.setState({ val: text });
  }
  updateTime(text) {
    this.setState({ time: text });
  }
  onFromTimePickerChange = time =>
    this.setState({
      fromTime: time,
      time: hmsToSeconds(time, this.state.untilTime)
    });
  onUntilTimePickerChange = time =>
    this.setState({
      untilTime: time,
      time: hmsToSeconds(this.state.fromTime, time)
    });

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Add task</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input
            placeholder="task..."
            value={this.state.val}
            onChange={e => this.updateText(e.target.value)}
          />
          <input
            placeholder="time.."
            value={this.state.time}
            onChange={e => this.updateTime(e.target.value)}
          />
          <section>
            <h6> Optional: </h6>
            <Tags
              tags={tagStore.tags}
              onChange={tag => this.setState({ tag: tag })}
            />
            <div>
              From: <TimePicker onChange={this.onFromTimePickerChange} />
            </div>

            <div>
              Until:
              <TimePicker onChange={this.onUntilTimePickerChange} />
            </div>
          </section>

          <button
            onClick={this.handleSubmit}
          >
            Submit
          </button>

          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}
export default AddItemModal;
