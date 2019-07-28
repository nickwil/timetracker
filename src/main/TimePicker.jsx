import React from 'react'

function TimePicker({ onChange, value, data_test_id }) {
  const [hours, updateHours] = React.useState('')
  const [seconds, updateSeconds] = React.useState('')
  const [timeOfDay, updateTimeOfDay] = React.useState('AM')
  // if more than two make red

  var hoursStyle = null
  if (hours !== undefined) {
    if (hours.length > 2 || hours > 12) {
      hoursStyle = { backgroundColor: `red` }
    }
  }

  var secondStyle = null
  if (seconds !== undefined) {
    if (seconds.length > 2 || seconds > 59) {
      secondStyle = { backgroundColor: `red` }
    }
  }
  const handleChange = (hours, seconds, timeOfDay) => {
    if (timeOfDay === 'AM') {
      onChange(hours + ':' + seconds)
    } else {
      onChange(Number(hours) + 12 + ':' + seconds)
    }
  }

  return (
    <span>
      <input
        style={hoursStyle}
        onChange={e => {
          updateHours(e.target.value)
          handleChange(e.target.value, seconds, timeOfDay)
        }}
        data-testid={data_test_id + '-hours'}
        autoComplete="off"
        max="12"
        min="1"
        placeholder="--"
        type="number"
        value={hours}
      />
      :
      <input
        style={secondStyle}
        onChange={e => {
          updateSeconds(e.target.value)
          handleChange(hours, e.target.value, timeOfDay)
        }}
        autoComplete="off"
        max="59"
        min="0"
        data-testid={data_test_id + '-minutes'}
        placeholder="--"
        type="number"
        value={seconds}
      />
      <select
        data-testid={data_test_id + '-time-of-day'}
        onChange={e => {
          updateTimeOfDay(e.target.value)
          handleChange(hours, seconds, e.target.value)
        }}
      >
        <option>AM</option>
        <option>PM</option>
      </select>
    </span>
  )
}
export default TimePicker
