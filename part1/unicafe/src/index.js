import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({text, value}) => {
  return <p>{text} {value}</p>
}

const Statistics = (props) => {
  console.log("Statistics", props)
  const {good, neutral, bad, total, average, positive} = props

  if(total === 0) {
    return (
      <div>
        <p>No feedback given!!</p>
      </div>
    )  
  }
  return (
    <div>
      <Statistic text="Good" value={good} />
      <Statistic text="Neutral" value={neutral} />
      <Statistic text="Bad" value={bad} />
      <Statistic text="Total" value={total} />
      <Statistic text="Average" value={average} />
      <Statistic text="Positive" value={positive} />
    </div>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = ((good / all) * 100)

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
       handleClick ={increaseGood} 
       text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={all} average={average} positive={positive} />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
)