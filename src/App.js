import { useState, useEffect, useMemo } from 'react';
import './styles.css'
import Welcom from './Welcom';
import Question from './Question';
function App() {

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([])
  const [checking, setChecking] = useState(false)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [playAgain, setPlayAgain] = useState(false)


  const fetchData = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy');
    const data = await response.json();
    setQuestions(data.results)
    setQuestions(prev => {
      return prev.map(question => {
        return {
          ...question,
          questions: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
        }
      })
    })
  }

  const correctAnswers = useMemo(() => {
    return questions.map(question => [...question.questions].indexOf(question.correct_answer))
  }, [questions])

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }, [playAgain])

  const handleChoose = (questionIndex, index) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = index
    setAnswers(newAnswers)
  }

  const checkAnswers = () => {
    if (!checking) {
      setChecking(true)
    }
    else {
      setChecking(false)
      setPlayAgain(true)
      setScore(0)
      setAnswers([])
      setStart(false)
    }

    correctAnswers.forEach((corr, index) => {
      if (corr === answers[index]) setScore(prev => prev + 1)
    })
  }

  return (
    <>
      {!start ?
        <Welcom startFunction={() => setStart(true)} />
        :
        <section className='quiz-section'>
          {
            questions.map((question, questionIndex) => {
              return <Question
                key={questionIndex}
                questionIndex={questionIndex}
                {...question}
                handleChoose={handleChoose}
                answer={answers[questionIndex]}
                correctAnswers={correctAnswers}
                checking={checking}
              />
            })
          }
          {
            checking &&
            <div className="score">
              Your Scored {score} <sub>/{questions.length}</sub>
            </div>
          }
          <div className="check-btn">
            <button onClick={() => checkAnswers()
            }>
              {checking ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </section>
      }
    </>
  );
}

export default App;
