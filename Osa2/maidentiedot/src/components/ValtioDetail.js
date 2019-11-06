import React from "react"
const ValtioDetail = ({ valtio }) => {
    return (
      <div>
        <h1>{valtio.name}</h1><p>Capital: {valtio.capital}</p><p>Population: {valtio.population}</p><h2>Languages</h2>
        <ul>{valtio.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
        <img src={valtio.flag} alt="flag" height="128" />
      </div>
    )
  }
  export default ValtioDetail;