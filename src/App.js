import React, {useState} from 'react';
import './App.css';
import Timer from "./Timer.jsx"
import Calendar from "./Calendar.jsx"
import AddItemModal from "./AddItemModal.jsx"

import { observer } from 'mobx-react-lite'
import CustomLink from "./CustomLink.jsx"

import {date} from "./util/quick.js"
import {timeStore} from "./store.js"
import ItemList from "./ItemList.jsx"
function Tag(name, value){
  this.name = name
  this.value = value
}

const App = observer(function App({store, dayFromUrl}) {
  const [currentDay, changeDay] = useState(Number(dayFromUrl))
  const [tags, updateTag] = useState([new Tag("Other", "Other"), new Tag("School", "School")])


  // always have value in store to day from url
  store.updateDate(dayFromUrl)

  const sendTime = (count) => {
    
    if(currentIdCountingFrom){
      store.items[store.index(currentIdCountingFrom)].updateTimeTilCompletion(count)
      changeCurrentIdCountingFrom(null)
    } else {
      store.addItem('', count, "Other", '', true)
    }  
  }
  

  const [val, updateText] = useState("")
  const [time, updateTime] = useState("")
  const [isCounting, changeCountingBool] = useState(false)

  const [currentIdCountingFrom, changeCurrentIdCountingFrom] = useState(null)
  const changeIfCounting = (change, id=null) => {
    changeCurrentIdCountingFrom(id)
    changeCountingBool(change)
  }
  console.log(store.unCompletedTodos)
  return (
    <div className="App">    
      <header className="App-header">
      
        <p id="currentDate">
          
           <CustomLink to="/calendar"> {date(new Date(currentDay))}</CustomLink>
          
        </p>
        <Timer isCounting={isCounting} changeIfCounting={changeIfCounting} sendTime={(count) => sendTime(count)}/>
      </header>

      <section>
      <h4>Remaining</h4>        

          {store.unCompletedTodos.map((obj) => 
            <ItemList
            item={obj}
            store={store}
            tags={tags}/>)}
 
      </section>
      
      <section>
      <h4>Completed </h4>
          {store.completedTodos.map((obj) => 
            <ItemList
            item={obj}
            store={store}
            tags={tags}/>)}
      </section>
      <AddItemModal addTask={store.addItem}/>
     
    </div>
  );
})

export default App;
