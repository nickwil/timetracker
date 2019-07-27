import React from "react";
import Modal from "react-modal";
import CustomModal from "../general/CustomModal.jsx"
import TimePicker from "./TimePicker.jsx";
import Tags from "./Tags.jsx";
import tagStore from "../stores/tagStore.js";
import styles from "./AddItemModal.module.css"


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
/* istanbul ignore next */ 
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');
function hmsToSeconds(fromTime, untilTime) {
  var start = getHourAndSeconds(fromTime);
  var end = getHourAndSeconds(untilTime);
  console.log(end.minutes, start.minutes);
  var hoursInSeconds = (end.hours - start.hours) * 60 * 60;
  var minutesInSeconds = (end.minutes - start.minutes) * 60;
  if(hoursInSeconds + minutesInSeconds < 0){
    return 0
  }
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
      val: "",
      time: "",
      fromTime: "",
      untilTime: "",
      tag: "Other"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(){
    if(this.state.time > 0){
      this.props.addTask(
                  this.state.val,
                  Number(this.state.time),
                  this.state.tag
      )
      this.setState({val: "",
      time: "",
      fromTime: "",
      untilTime: "",
      tag: "Other"})
    }


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
        <CustomModal
        modalText="+"
        modalTextButtonClassName={styles.addButton}
        >
          <input
            placeholder="task..."
            value={this.state.val}
            onChange={e => this.updateText(e.target.value)}
          />
          <input
            type="number"
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
              From: <TimePicker data_test_id="from" onChange={this.onFromTimePickerChange} />
            </div>

            <div>
              Until:
              <TimePicker  data_test_id="until" onChange={this.onUntilTimePickerChange} />
            </div>
          </section>

          <button
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </CustomModal>
      </div>
    );
  }
}
export default AddItemModal;
