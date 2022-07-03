import { useState, useEffect } from 'react';
import './styles.css'
import Welcom from './Welcom';
import Choice from './Choice';
function App() {
  // array.sort(() => Math.random() - 0.5);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState(new Array(5))
  const [checking, setChecking] = useState(false)

  const fetchData = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
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

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error.message)
    }

  }, [])

  function choose(questionIndex, index) {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = index;
    setAnswers(newAnswers);
  }


  const checkAnswers = () => {
    setChecking(true)
    return questions.map(question => {
      return question.questions.indexOf(question.correct_answer)
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

              return (
                <div className='question'>
                  <h1>{question.question}</h1>
                  <div className="choices">
                    {
                      question.questions.map((choice, index) => {
                        return <Choice
                          key={index}
                          index={index}
                          choice={choice}
                          choose={() => !checking && choose(questionIndex, index)}
                          chosen={answers[questionIndex] === index}
                        >
                        </Choice>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          <div className="check-btn">
            <button onClick={!checking && checkAnswers}>
              Check answers
            </button>
          </div>
        </section>
      }
    </>
  );
}

export default App;
