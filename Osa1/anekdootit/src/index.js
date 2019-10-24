import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Header = ({ text }) => <h1>{text}</h1>

const App = ({ anecdotes }) => {

    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
    const mostVotes = vote.indexOf(Math.max(...vote))
    const math = () => setSelected(Math.floor(Math.random() * 6))
    const votes = () => {
        const clone = [...vote]
        clone[selected] += 1
        setVote(clone)
    }
    return (
        <div>
            <Header text="Anecdote of the day" />
            <p>{anecdotes[selected]}<br />has {vote[selected]} votes</p>
            <Button onClick={votes} text="Vote" />
            <Button onClick={math} text="Next anecdote" />
            <Header text="Anecdote with most votes" />
            <p>{anecdotes[mostVotes]}<br />has {vote[mostVotes]} votes</p>
        </div>
    )
}
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))