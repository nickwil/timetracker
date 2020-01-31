import React from 'react'
import Modal from 'react-modal'
import Button from "../general/Button.jsx"

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

class CustomModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }
  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <span className={this.props.className}>
        <button
          className={this.props.modalTextButtonClassName}
          data-testid={this.props.data_button_test_id}
          onClick={this.openModal}
        >
          {this.props.modalText}
        </button>
        <Modal
          ariaHideApp={process.env.NODE_ENV !== 'test'}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.props.contentLabel}
        >
          <div>
            {this.props.children}
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </Modal>
      </span>
    )
  }
}
export default CustomModal
