import React from 'react'

export default function Choice({ choice, questionIndex, choiceIndex, handleChoose, correctAnswer }) {
    const bg = { backgroundColor: correctAnswer === choiceIndex ? '#D6DBF5' : 'transparent' }
    return (
        <span style={bg}
            onClick={() => handleChoose(questionIndex, choiceIndex)}
        >
            {choice}
        </span>
    )
}

