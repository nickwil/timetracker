import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import TimePicker from 'react-time-picker'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')
function hmsToSeconds(s) {
  var b = s.split(':');
  return b[0]*3600 + b[1]*60;
}
class AddItemModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      val: "",
      time: "",
      fromTime: "10:00",
      untilTime: "10:01"
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  updateText(text){
    this.setState({val: text})
  }
  updateTime(text){
    this.setState({time: text})
  }
  onFromTimePickerChange = time => this.setState({ fromTime: time, time: hmsToSeconds(this.state.untilTime) - hmsToSeconds(this.state.fromTime) })
  onUntilTimePickerChange = time => this.setState({ untilTime: time, time: hmsToSeconds(this.state.untilTime) - hmsToSeconds(this.state.fromTime) })

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
        <input placeholder="task..." value={this.state.val} onChange={(e) => this.updateText(e.target.value)} />
        <input placeholder="time.." value={this.state.time} onChange={(e) => this.updateTime(e.target.value)} />
        <section>
          <h6> Optional: </h6>
          <div>From: <TimePicker
          disableClock={true}
            onChange={this.onFromTimePickerChange}
            value={this.state.fromTime}
          /></div>

        <div>
          Until:<TimePicker
          disableClock={true}
            onChange={this.onUntilTimePickerChange}
            value={this.state.untilTime}
          />
        </div>
        </section>

       <button onClick={() => this.props.addTask(this.state.val, Number(this.state.time))}>Submit</button>
          
                    <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>
    );
  }
}
export default AddItemModal