import React from 'react'

import useInterval from './useInterval.js'
import styles from './Timer.module.css'
import { observer } from 'mobx-react-lite'
import toHour from '../util/toHour.js'

const Timer = observer(function Timer({
  sendTime,
  isCounting,
  changeIfCounting,
  timeStore,
  store,
}) {
  //const [count, updateCounting] = useState(0)
  useInterval(() => {
    // Your custom logic here
    if (timeStore.isCounting) {
      //updateCounting(count + 1);
      timeStore.incrementCount()
    }
  }, 1000)
  const handleOnClick = () => {
    if (timeStore.isCounting) {
      //console.log("send count")
      //sendTime(count)
      timeStore.setTimeToItem(store)
    }
    timeStore.reverseCounting()
    //changeIfCounting(!isCounting)
    // if just finished counting then you'll send the count

    //updateCounting(0)
    timeStore.resetCount()
  }
  return (
    <div className={styles.container}>
      <span data-testid="time-tracker" className={styles.timer}>
        {toHour(timeStore.count)}
      </span>
      <button
        data-testid="play/pause-button"
        className={styles.startButton}
        onClick={() => handleOnClick()}
      >
        {timeStore.count === 0 ? (
          <svg
            width="40%"
            height="43%"
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4952 11.4272L0.788868 22.7579L0.701819 0.241405L19.4952 11.4272Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="40%"
            height="43%"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="8" height="30" fill="white" />
            <rect x="21" width="8" height="30" fill="white" />
          </svg>
        )}
      </button>
    </div>
  )
})

export default Timer
