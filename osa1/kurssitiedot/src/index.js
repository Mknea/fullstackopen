import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(<h1>{props.course}</h1>)
}

const Content = (props) => {
  return(<p>{props.excercisePart} {props.numberOfExcercises}</p>)
}

const Total = (props) => {
  return(<p>Number of exercises {props.combinedNumber}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content excercisePart={part1} numberOfExcercises={exercises1} />
      <Content excercisePart={part2} numberOfExcercises={exercises2} />
      <Content excercisePart={part3} numberOfExcercises={exercises3} />
      <Total combinedNumber={exercises1 + exercises2 + exercises3} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
