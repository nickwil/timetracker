import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {date} from "./util/quick.js"
import {useSpring, animated} from 'react-spring'
import Timer from "./Timer.jsx"
import Tags from "./Tags.jsx"
import Calendar from "./Calendar.jsx"
import ItemTime from "./ItemTime.jsx"
import styles from "./Item.module.css"
import AddItemModal from "./AddItemModal.jsx"



function Tag(name, value){
  this.name = name
  this.value = value
}

function App() {
  const [currentWork, updateCurrentWork] = useState(null)
  const [currentDay, changeDay] = useState(new Date().getTime()) 
  const [tags, updateTag] = useState([new Tag("Other", "Other"), new Tag("School", "School")])
  const [allItems, update] = useState([{
      created: Date.now(),
      tilCompletion: 13,
      completed: false,
      length: 13,
      day: date(),
      text: "Study for accounting",
      tagId: "Other",
      // temp id creation
      id: Date.now(),
    },{
      created: Date.now(),
      tilCompletion: 13,
      completed: true,
      length: 13,
      day: date(),
      text: "Chem Lab",
      tagId: "Other",
      // temp id creation
      id: Date.now(),
    }])

  /*
    item structure: 
    {
      created: unix time
      tilCompletion: time left until the task will be done
      length: time the task will take
      text: text related to task
    }
  */
  const addTask = (text, length, tag, title='', completed = false) => {
    console.log("completed", completed)
    const task = {
      created: Date.now(),
      tilCompletion: length,
      length: length,
      day: date(),
      tagId: tag,
      text: text,
      title: title, 
      completed: completed,
      // temp id creation
      id: Date.now(),
    }
    update([...allItems, task])
  }
  const sendTime = (count) => {
    if(currentWork){
      // subtract from time worked on
      console.log("subtract from time worked")
    }
    if(currentIdCountingFrom){
      updateTaskTimeTilCompletion(count, currentIdCountingFrom)
    } else {
      addTask('', count, new Tag("Other", "Other"), '', true)
    }  
  }
  const updateTask = (text, id) => {
    console.log(id)
    const index = allItems.findIndex(obj => obj.id == id)
    console.log(index)
    var newItems = allItems
    newItems[index].text = text
    update(newItems)
  }

  const updateTaskTimeTilCompletion = (timeSpent, id) => {
    const index = allItems.findIndex(obj => obj.id == id)
    var newItems = allItems
    var item = newItems[index]
    item.tilCompletion = item.tilCompletion - timeSpent
    if(item.tilCompletion < 0){
      item.completed = true
      item.tilCompletion = item.length
    }
    changeCurrentIdCountingFrom(null)
    update(newItems)
  }

  const updateItemTag = (tag, id) => {
    console.log(tag, id)
    const index = allItems.findIndex((obj) => obj.id == id)
    var newItems = allItems
    newItems[index].tagId = tag
    update(newItems)
  }

  const [val, updateText] = useState("")
  const [time, updateTime] = useState("")
  const currentDayItems = allItems.filter(obj => obj.day == date(new Date(currentDay)))
  const uncompletedCurrentDayItems = currentDayItems.filter(obj => obj.completed == false)
  const completedCurrentDayItems = currentDayItems.filter(obj => obj.completed == true)
  const [isCounting, changeCountingBool] = useState(false)

  const [currentIdCountingFrom, changeCurrentIdCountingFrom] = useState(null)
  const changeIfCounting = (change, id=null) => {
    changeCurrentIdCountingFrom(id)
    changeCountingBool(change)
  }
  return (
    <div className="App">

    {/*<Calendar currentDay={currentDay} changeDay={changeDay}/>*/}
    
      <header className="App-header">
      {/*
        // need to figure out how it'll work UI wise
      <button>Add tag</button>
        <button onClick={() =>
          { 
            changeDay(currentDay - 24*60*60*1000)
     
          }
          }
        >Prev Day</button>
        <button onClick={() =>
          { 
        
            changeDay(currentDay + 24*60*60*1000)
   
          }
          }
        >Next Day</button>

        */}
        <p id="currentDate">
          {
            date(new Date(currentDay))
          }
        </p>
        <Timer isCounting={isCounting} changeIfCounting={changeIfCounting} sendTime={(count) => sendTime(count)}/>
      </header>

      <section>
      <h4>Remaining</h4>        

          {uncompletedCurrentDayItems.map((obj) => 
            <div className={styles.container}>
              <ItemTime id={obj.id} changeIfCounting={changeIfCounting} time={obj.tilCompletion}/>
              <Input styles={styles.input} text={obj.text} id={obj.id} onTaskChange={updateTask}/>
              <Tags onChange={(tag) => updateItemTag(tag, obj.id)} defaultTagId={obj.tagId} tags={tags}/>
            </div>)}
 
      </section>
      
      <section>
      <h4>Completed </h4>
          {completedCurrentDayItems.map((obj) => 
            <div className={styles.container}>
              {/* right now itemtime will error out due to it not being given the function changeIfCounting
              but this isn't needed there*/}
              <ItemTime time={obj.tilCompletion}/>
              <Input styles={styles.input} text={obj.text} id={obj.id} onTaskChange={updateTask}/>
              <Tags onChange={(tag) => updateItemTag(tag, obj.id)} defaultTagId={obj.tagId} tags={tags}/>
            </div>)}
      </section>
      <AddItemModal addTask={addTask}/>
     
    </div>
  );
}

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

class Input extends React.Component {

  state = {text: this.props.text}
  onChange(e){
    this.setState({text: e.target.value})
    this.props.onTaskChange(e.target.value, this.props.id)
  }
  render(){
    return <input className={this.props.styles} onChange={(e) => this.onChange(e)} value={this.state.text}/>
  }
}
export default App;
