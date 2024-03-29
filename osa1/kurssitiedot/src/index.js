import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(<h1>{props.course.name}</h1>)
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return(<p>{props.part.name} {props.part.exercises}</p>)
}

const Total = (props) => {
  const numbers = props.parts.map(item => item.exercises)
  const number = numbers.reduce((acc, curr) => acc + curr)
  return(
    <p>Number of exercises {number}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts = {course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
