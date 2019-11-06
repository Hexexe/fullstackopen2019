import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Valtiot from './components/Valtiot'

const App = () => {

  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  const handleFilter = e => setFilter(e.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filterv={filter} handleFilter={handleFilter} />
      <Valtiot countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App;