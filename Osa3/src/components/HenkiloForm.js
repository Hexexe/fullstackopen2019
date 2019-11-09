import React from 'react'
const HenkiloForm = ({ lh, nN, yN, n, yNu }) => {
    return (
        <form onSubmit={lh}>
            <div>name: <input value={nN} onChange={yN} /></div>
            <div>number: <input value={n} onChange={yNu} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}
export default HenkiloForm