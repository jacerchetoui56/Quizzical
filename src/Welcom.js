import React from 'react'

export default function Welcom({ startFunction }) {
    return (
        <section className='welcom'>
            <h1>Quizzical</h1>
            <p>Answer some questions and have fun!</p>
            <button onClick={startFunction}>Start Quiz</button>
        </section>
    )
}
