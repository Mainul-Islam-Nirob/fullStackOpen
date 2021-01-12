import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdotes = ({ quote, selected }) => {
  return <p>{quote[selected]}</p>
}

const Votes = ({ votes, selected }) => {
  return <p>has {votes[selected]} votes</p>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = props => {
  const initialVotes = Array(props.anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const updateVote = () => {
    // Create copy of votes
    let updatedVotes = [...votes];
    // Add the vote
    updatedVotes[selected]++;
    // Update the state with the new vote
    setVotes(updatedVotes);

  }
 
  // Generate a random number between 0 and 5
  const generateRandomNum = () => {
    return Math.floor(Math.random() * 6)
  }

  // Show random anecdote when button is clicked.
  const getRanQuote = () => {
    let randomNum = generateRandomNum()

    // If randomNum is same as selected, generate new random number
    while (randomNum === selected) {
      randomNum = generateRandomNum()
    }
    setSelected(randomNum);
  }

  return (
    <div>
      <Anecdotes quote={anecdotes} selected={selected} />
      <Votes votes={votes} selected={selected} />
      <Button handleClick={updateVote} text="vote" />
      <Button handleClick={getRanQuote} text="next anecdotes" />
    </div>
  )
  
  }

 

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)