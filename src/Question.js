import React from 'react'
export default function Question(props) {

    const { questions, question, questionIndex, handleChoose, correctAnswers, answer, checking } = props

    return (
        <div className='question'>
            <h1>{question}</h1>
            <div className="choices">
                {
                    questions.map((choice, choiceIndex) => {
                        let className = ''
                        if (!checking && answer === choiceIndex)
                            className = 'chosen'
                        else if (checking && choiceIndex === correctAnswers[questionIndex]) {
                            className = 'correct'
                        }
                        else if (checking && choiceIndex === answer && choiceIndex !== correctAnswers[questionIndex]) {
                            className = 'wrong'
                        }
                        return <span
                            key={choiceIndex}
                            className={className}
                            onClick={() => !checking && handleChoose(questionIndex, choiceIndex)}
                        >
                            {choice}
                        </span>
                    })
                }
            </div>
        </div>
    )
}
