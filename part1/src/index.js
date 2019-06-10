import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part = {props.parts[0]} />
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  const add = (a, b) => a + b;

  return(
    <div>
      Total exercises: {props.exercises.reduce(add)}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.part.name} -- {props.part.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]
  const exercises = [part1['exercises'], part2['exercises'], part3['exercises']]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total exercises={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))