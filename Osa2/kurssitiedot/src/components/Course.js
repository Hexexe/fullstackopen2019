import React from 'react'

const Header = ({ text }) => <h2>{text}</h2>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ content }) => {
    const total = () => content.reduce((yht, content) => yht + content.exercises, 0)
    const parts = () => content.map(osa => <Part key={osa.id} part={osa} />)
    return <>{parts()}<h4>Total of {total()} exercises</h4></>
}

const Course = ({ courses }) => courses.map(c => <div key={c.id}><Header text={c.name} /><Content content={c.parts} /></div>)
export default Course
