import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(<h1>{props.course}</h1>)
}

const Content = (props) => {
  return(
    <div>
      <Part partName={props.part1} partNumber={props.exercises1}/>
      <Part partName={props.part2} partNumber={props.exercises2}/>
      <Part partName={props.part3} partNumber={props.exercises3}/>
    </div>
  )
}

const Part = (props) => {
  return(<p>{props.partName} {props.partNumber}</p>)
}

const Total = (props) => {
  return(<p>Number of exercises {props.combinedNumber}</p>)
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
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total combinedNumber={exercises1 + exercises2 + exercises3} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
