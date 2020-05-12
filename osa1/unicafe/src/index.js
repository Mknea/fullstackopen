import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Content = ({ votes, text}) => (
  <div>{text} {votes}</div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name='Give feedback on the service quality'/>
      <div>
        <Button onClick={handleGoodClick} text='Good' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
      </div>
      <Header name='Statistics'/>
      <div>
        <Content votes={good} text='good votes' />
        <Content votes={neutral} text='neutral votes' />
        <Content votes={bad} text='bad votes' />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)