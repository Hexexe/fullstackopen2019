const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let morgan = require('morgan')

app.use(morgan(':method :status :res[content-length] - :response-time ms :data'))
morgan.token('data',(req, res) => JSON.stringify(req.body))

app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelance",
        number: "39-44-532523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.get('/api/persons', (req, res) => res.json(persons))

app.get('/info', (req, res) => res.send(`<p>Phonebook has info for ${persons.length} people</p>${Date()}`))

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 10 ** 7) + 1
    const person = req.body
    const found = persons.some(p => p.name === person.name)
    if (!person.name) return res.status(400).json({ error: "name missing" })
    if (!person.number) return res.status(400).json({ error: "number missing" })
    if (found) return res.status(400).json({ error: "name must be unique" })
    person.id = id
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})