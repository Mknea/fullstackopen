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

const Votes = ({ votes, text}) => (
  <div>{text} {votes}</div>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  let ave = 0
  let positive = 0
  if (sum !== 0) {
    ave = (good - bad)/sum
    positive = good/sum
  }
  return(
    <>
    <div>
      Total votes {sum}
    </div>
    <div>
      Average {ave}
    </div>
    <div>
      Positive {positive} %
    </div>
    </>
  )
}

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
        <Votes votes={good} text='good votes' />
        <Votes votes={neutral} text='neutral votes' />
        <Votes votes={bad} text='bad votes' />
      </div>
      <br/>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)