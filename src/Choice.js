import React from 'react'

export default function Choice({ choice, choose, chosen, index, correctIndex }) {
    let bg = { backgroundColor: `${chosen ? '#D6DBF5' : 'transparent'}` }
    // if (chosen && correctIndex !== index) {
    //     bg = { backgroundColor: `${chosen ? '#F8BCBC' : 'transparent'}` }
    // }
    // else if (chosen && correctIndex === index) {
    //     bg = { backgroundColor: `${chosen ? '#94D7A2' : 'transparent'}` }
    // }
    return (
        <span style={bg} onClick={choose}>{choice}</span>
    )
}
