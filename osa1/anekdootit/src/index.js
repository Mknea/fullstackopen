import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
    <h1>{text}</h1>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVotedIndex, setmostVotedIndex] = useState(0)
  const handleNextClick = () => {
    const newIndex = Math.floor(Math.random() * (props.anecdotes.length))
    console.log(newIndex)
    setSelected(newIndex)
  }
  const handleVoteClick = () => {
    const copy = [...voted]
    copy[selected] += 1
    setVoted(copy)
    if (copy[selected] > copy[mostVotedIndex]) {
      setmostVotedIndex(selected)
    }  
  }
  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <div>{props.anecdotes[selected]}</div>
      <div>This anecdote has {voted[selected]} votes.</div>
      <Button onClick={handleVoteClick} text={'Vote'} />
      <Button onClick={handleNextClick} text={'Next anecdote'} />
      <Header text={'Anecdote with the most votes'} />
      <div>{props.anecdotes[mostVotedIndex]}</div>
      <div>Has {voted[mostVotedIndex]} votes.</div>
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