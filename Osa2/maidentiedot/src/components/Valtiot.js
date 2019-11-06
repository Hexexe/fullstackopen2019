import React from "react"
import ValtioDetail from './ValtioDetail'
const Valtiot = ({ countries, filter, setFilter }) => {
    const countryFilter = () => countries.filter(h => h.name.toUpperCase().includes(filter.toUpperCase()))
    const m = countryFilter()[0]
    if (countryFilter().length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countryFilter().length === 1) {
      return <ValtioDetail key={m.name} valtio={m} />
    } else {
      return countryFilter().map(c => <p key={c.name}>{c.name}<button onClick={() => setFilter(c.name)}>Show</button></p>)
    }
  }
  export default Valtiot;