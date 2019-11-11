import React, { useState, useEffect } from 'react'
import noteService from './services/persons'
import Header from './components/Header'
import Henkilot from './components/Henkilot'
import Filter from './components/Filter'
import HenkiloForm from './components/HenkiloForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationM, setNotificationM] = useState(null)
  const [type, setType] = useState(false)

  const yoinkNimi = e => setNewName(e.target.value)
  const yoinkNumero = e => setPhone(e.target.value)
  const filterMeme = e => setFilter(e.target.value)

  const message = (message, type) => {
    setType(type)
    setNotificationM(message)
    setTimeout(() => setNotificationM(null), 5000)
  }

  const lisaaHenkilo = e => {
    e.preventDefault()
    const f = persons.map(n => n.name)
    const person = { name: newName, number: phone }
    if (f.includes(newName)) {
      const target = persons.filter(n => n.name.toUpperCase().includes(newName.toUpperCase()))
      handleUpdate(target[0])
    } else {
      noteService
        .create(person)
        .then(uusiH => {
          setPersons(persons.concat(uusiH))
          setNewName('')
          setPhone('')
          message(`${person.name} added`, true)
        })
        .catch(error => message(error.response.data.error, false))
    }
  }

  const handlePurge = id => {
    const individual = persons.find(i => i.id === id)
    if (window.confirm(`do you want to purge ${individual.name} from the list?`))
      noteService
        .purge(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          message(`Person ${individual.name} purged`, true)
        })
        .catch(() => {
          message(`Information of ${individual.name} was already been purged from server`, false)
          setPersons(persons.filter(n => n.id !== id))
        })
  }

  const handleUpdate = target => {
    const editObject = { ...target, number: phone }
    if (window.confirm(`${target.name} is already added to phonebook, replace the old number with a new one?`))
      noteService
        .update(target.id, editObject)
        .then(updateH => {
          setPersons(persons.map(p => p.id !== target.id ? p : updateH))
          message(`${target.name}s number updated`, true)
        })
        .catch(message(`${target.name}s number update failed`, false))
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(kaikkiH => setPersons(kaikkiH))
  }, []) // [persons.length] toimii myös

  return (
    <>
      <Notification message={notificationM} type={type} />
      <Header text="Phonebook" />
      <Filter filter={filter} filterMeme={filterMeme} />
      <Header text="add a new" />
      <HenkiloForm lh={lisaaHenkilo} nN={newName} yN={yoinkNimi} n={phone} yNu={yoinkNumero} />
      <Header text="Numbers" />
      <Henkilot persons={persons} handlePurge={handlePurge} filter={filter} />
    </>
  )
}
export default App