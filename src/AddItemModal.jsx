import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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

class AddItemModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      val: "",
      time: "",
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
         <input placeholder="task..." val={this.state.val} onChange={(e) => this.updateText(e.target.value)} />
        <input placeholder="time.." val={this.state.time} onChange={(e) => this.updateTime(e.target.value)} />
        <button onClick={() => this.props.addTask(this.state.val, this.state.time)}>Submit</button>
          
                    <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>
    );
  }
}
export default AddItemModal