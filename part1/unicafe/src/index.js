import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  console.log("Statistics", props)
  const {good, neutral, bad, total, average, positive} = props

  if(total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given!!</p>
      </div>
    )
    
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p>
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
  const positive = (good / all) * 100;

  const incGood = () => setGood(good + 1);
  const incNeutral = () => setNeutral(neutral + 1);
  const incBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incGood}>good</button>
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={all} average={average} positive={positive} />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
)