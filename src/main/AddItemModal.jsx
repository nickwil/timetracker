import React from 'react'
import Modal from 'react-modal'
import TimePicker from './TimePicker.jsx'
import Tags from './Tags.jsx'
import styles from './AddItemModal.module.css'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
/* istanbul ignore next */

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')
function hmsToSeconds(fromTime, untilTime) {
  var start = getHourAndSeconds(fromTime)
  var end = getHourAndSeconds(untilTime)
  console.log(end.minutes, start.minutes)
  var hoursInSeconds = (end.hours - start.hours) * 60 * 60
  var minutesInSeconds = (end.minutes - start.minutes) * 60
  if (
    hoursInSeconds + minutesInSeconds < 0 ||
    isNaN(hoursInSeconds + minutesInSeconds)
  ) {
    return 0
  }
  return hoursInSeconds + minutesInSeconds
}

function getHourAndSeconds(time) {
  var timeArr = time.split(':')
  return {
    hours: Number(timeArr[0]),
    minutes: Number(timeArr[1]),
  }
}
class AddItemModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
      val: '',
      time: '',
      fromTime: '',
      untilTime: '',
      tag: 'Other',
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    if (this.state.time > 0) {
      this.props.addTask(
        this.state.val,
        Number(this.state.time),
        this.state.tag
      )
      this.closeModal()
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  updateText(text) {
    this.setState({ val: text })
  }
  updateTime(text) {
    this.setState({ time: text })
  }
  onFromTimePickerChange = time =>
    this.setState({
      fromTime: time,
      time: hmsToSeconds(time, this.state.untilTime),
    })
  onUntilTimePickerChange = time =>
    this.setState({
      untilTime: time,
      time: hmsToSeconds(this.state.fromTime, time),
    })

  render() {
    return (
      <div>
        <div style={{ textAlign: `right` }}>
          <button className={styles.addButton} onClick={this.openModal}>
            +
          </button>
        </div>
        <Modal
          ariaHideApp={process.env.NODE_ENV !== 'test'}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h2 className={styles.title}>Add a task!</h2>
        <section className={styles.grouping}>
        <label className={styles.dataInput}>
          Task Description:
          <input
            placeholder="Enter task description..."
            value={this.state.val}
            onChange={e => this.updateText(e.target.value)}
          />
          </label>
          <label className={styles.dataInput}>
          Length of task (in seconds):
          <input
            placeholder="Enter time..."
            value={this.state.time}
            onChange={e => this.updateTime(e.target.value)}
          />
          </label>
        </section>
          <section>
            <h6 className={styles.title}> Optional: </h6>
            <label>
            Tag:
            <Tags
              defaultTagId="Other"
              tags={this.props.tags}
              onChange={tag => this.setState({ tag: tag })}
            />
            </label>
            <div>
              From:{' '}
              <TimePicker
                data_test_id="from"
                onChange={this.onFromTimePickerChange}
              />
            </div>

            <div>
              Until:
              <TimePicker
                data_test_id="until"
                onChange={this.onUntilTimePickerChange}
              />
            </div>
          </section>
          <div className={styles.grouping}>
          <button onClick={this.handleSubmit}>Submit</button>

          <button onClick={this.closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    )
  }
}
export default AddItemModal
