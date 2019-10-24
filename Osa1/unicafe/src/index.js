import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <><h1>{text}</h1></>
const Button = ({ onClick, text }) => <><button onClick={onClick}>{text}</button></>
const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ good, neutral, bad }) => {
    return (
        <table>
            <tbody>
                <Statistic text="Good " value={good} />
                <Statistic text="Neutral " value={neutral} />
                <Statistic text="Bad " value={bad} />
                <Statistic text="All " value={bad + neutral + good} />
                <Statistic text="Average " value={(good - bad) / (good + bad + neutral)} />
                <Statistic text="Positive " value={`${good / (good + bad + neutral) * 100} %`} />
            </tbody>
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="Give Feedback" />
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />
            <Header text="Statistics" />
            {good || neutral || bad ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))