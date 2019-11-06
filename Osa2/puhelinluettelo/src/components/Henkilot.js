import React from 'react'
import Henkilo from './Henkilo'
const Henkilot = ({ persons, handlePurge, filter }) => {
    const henkiloFilter = () => persons.filter(h => h.name.toUpperCase().includes(filter.toUpperCase()))
    return henkiloFilter().map(h => <div key={h.id}><Henkilo name={h.name} phone={h.number} /> <button onClick={() => handlePurge(h.id)}>Purge</button> </div>)
}
export default Henkilot