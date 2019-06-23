import React from "react"
import Modal from 'react-modal';
import styles from "./ItemMenu.module.css"
function ItemMenu({store, id}){
	// if small view then have 3 dots and use modal if not then just display it there
	// if small view then show 3 dots, and use modal

	// use CSS media query to show or hide
		const storeItem = store.items[store.index(id)]

	return (<React.Fragment>
					<span className={styles.container}>
						<button onClick={() => store.deleteItem(id)}>Delete</button>
						<input value={storeItem.tilCompletion} onChange={(e) =>storeItem.updateLengthOfTask(Number(e.target.value)) }placeholder="change time for task"/>
					</span>
					<ItemMenuModal className={styles.modalContainer} store={store} id={id} storeItem={storeItem}/>
			</React.Fragment>)
}


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

class ItemMenuModal extends React.Component {
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
      <div className={this.props.className}>
        <button onClick={this.openModal}>⋮</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <button onClick={() => this.props.store.deleteItem(this.props.id)}>Delete</button>
			<input value={this.props.storeItem.tilCompletion} 
			onChange={(e) =>this.props.storeItem.updateLengthOfTask(Number(e.target.value)) }
			placeholder="change time for task"/>
			 <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>
    );
  }
}
export default ItemMenu