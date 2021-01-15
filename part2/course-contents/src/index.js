import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
 return (
    <>
     <Header header={course.name} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
   </>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map((part, id) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))
      }
    </>
  )
}

const Part = ({part, exercises}) => {
  return(
    <p>
      {part} {exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((acc, curr) => acc +curr.exercises, 0)
  return <p>Total Number of exercises {total}</p>
}


ReactDOM.render(<App />, document.getElementById('root'))