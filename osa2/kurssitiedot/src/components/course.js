import React from 'react'

const Header = ( {text} ) => {
  return(<h1>{text}</h1>)
}

const Content = ( {parts} ) => {
  return(
    <div>
      {parts.map(part =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Part = ( {part} ) => {
  return(
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Total = ( {parts} ) => {
  const numbers = parts.map(item => item.exercises)
  const number = numbers.reduce((acc, curr) => acc + curr)
  return(
    <p>Combined number of exercises {number}</p>
  )
}

const Course = ( {course} ) => {
    return(
        <div>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;