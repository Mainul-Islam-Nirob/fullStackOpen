import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  
  const incGood =() => setGood(good + 1);
  const incNeutral =() => setNeutral(neutral + 1)
  const incBad = () => setBad(bad + 1)
    
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incGood}>good</button>
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>

      <h1>Statistic</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p> 
      <p>Total {all}</p>
      <p>average {(good * 1 + neutral * 0 + bad * -1) / all}</p>
      <p>Positive {(good / all) * 100} %</p>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)