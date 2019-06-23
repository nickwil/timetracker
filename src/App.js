import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useSpring, animated} from 'react-spring'
import Timer from "./Timer.jsx"
import Tags from "./Tags.jsx"
import Calendar from "./Calendar.jsx"
import ItemTime from "./ItemTime.jsx"
import styles from "./Item.module.css"
import AddItemModal from "./AddItemModal.jsx"

import { observer } from 'mobx-react-lite'
import CustomLink from "./CustomLink.jsx"

import {date} from "./util/quick.js"

import Input from "./Input.jsx"
import ItemList from "./ItemList.jsx"
function Tag(name, value){
  this.name = name
  this.value = value
}

const App = observer(function App({store, dayFromUrl}) {
  const [currentWork, updateCurrentWork] = useState(null)
  const [currentDay, changeDay] = useState(Number(dayFromUrl))
  const [tags, updateTag] = useState([new Tag("Other", "Other"), new Tag("School", "School")])


  // always have value in store to day from url
  store.updateDate(dayFromUrl)

  const sendTime = (count) => {
    if(currentWork){
      // subtract from time worked on
      console.log("subtract from time worked")
    }
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
            obj={obj}
            store={store}
            tags={tags}/>)}
 
      </section>
      
      <section>
      <h4>Completed </h4>
          {store.completedTodos.map((obj) => 
            <div className={styles.container}>
              {/* right now itemtime will error out due to it not being given the function changeIfCounting
              but this isn't needed there*/}
               <ItemTime id={obj.id} changeIfCounting={changeIfCounting} time={obj.tilCompletion}/>
              <Input styles={styles.input} text={obj.text} id={obj.id} 
              onTaskChange={(text) => store.items[store.index(obj.id)].updateText(text)}/>
              <Tags 
              onChange={(tag) => store.items[store.index(obj.id)].updateTag(tag)} 
              defaultTagId={obj.tagId} tags={tags}/>
            </div>)}
      </section>
      <AddItemModal addTask={store.addItem}/>
     
    </div>
  );
})

function AnimatedInput ({outsideChange, extras = {}}){
    const [showAnimation, changeAnimation] = useState(false) 
    const style = useSpring({
    width: showAnimation ? `25%` : `0%`,
    from: { width: `0%`, height: `0.25em`, backgroundColor: `blue` },
  })
  const [value, onChange] = useState("")
  const handleOnChange  = (text) => {
    if(text != ''){
      changeAnimation(true)
    } else {
      changeAnimation(false)
    }
    onChange(text)
    
    outsideChange(text, extras)
  }
  const handleOnBlur = () => {
    changeAnimation(false)
  }
  const handleOnFocus = () => {
    if(value != ''){
      changeAnimation(true)
    }
  }
return (<div>
          <input onFocus={() => handleOnFocus()} style={{width: `25%`, border: `0`}} onBlur={() => handleOnBlur()} onChange={(e) => handleOnChange(e.target.value)} value={value}/>
          <animated.div style={style}></animated.div>
      </div>)
}


export default App;
