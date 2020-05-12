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

const StatisticLine = ({ text, number, unit=''}) => (
  <tr><td>{text}</td><td>{number}{unit}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  if (sum !== 0) {
    let ave = 0
    let positive = 0
    ave = (good - bad)/sum
    positive = good*100/sum
    return(
      <table>
      <tbody>
      <StatisticLine text='Good votes' number={good} />
      <StatisticLine text='Neutral votes' number={neutral} />
      <StatisticLine text='Bad votes' number={bad} />
      <StatisticLine text='Total votes' number={sum}/>
      <StatisticLine text='Average' number={ave}/>
      <StatisticLine text='Positive' number={positive} unit={'%'}/>
      </tbody>
      </table>
    )
  }
  else {
    return(<div>No feedback given yet!</div>)
  }
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)