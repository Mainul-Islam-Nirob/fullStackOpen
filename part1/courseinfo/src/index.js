import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log("Header", props);
  return <h1>{props.header.name}</h1>
}

const Part = (props) => {
  console.log("Part", props);
  return <p>{props.con.name} {props.con.exercises}</p> 
}

const Content = (props) => {
  console.log("Content",props);
  return (
  <div>
    <Part con={props.content.parts[0]} />
    <Part con={props.content.parts[1]} />
    <Part con={props.content.parts[2]} />   
  </div>
  )
}

const Total = (props) => {
  console.log("Total", props);
  return <p>Number of exercises {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
    
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
      <Header header={course} />
      <Content content={course} />
      <Total total={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))