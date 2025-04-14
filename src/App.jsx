import { useState, useEffect } from 'react'
import Keyboard from './Keyboard/keyboard'
import AnswerGrid from './AnswerGrid/AnswerGrid'
import { generate } from 'random-words'
import './App.css'

function App() {
  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }).split(''));
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState([]);

  function handleInput(letterInput) {
    setLetters(prevLetters => {
      if (prevLetters.length < 5) return [...prevLetters, letterInput]
      return prevLetters
    })
  }
  
  useEffect(() => {
    function handleKeyDown(e) {
      const rex = /^[A-Za-z]$/;
      if (letters.length >= 5 && e.key === 'Enter') {
        setIndex((prevIndex) => prevIndex + 1)
      } else if (rex.test(e.key)) {
        handleInput(e.key)
      } else if (e.key === 'Backspace') {
        console.log(e.key)
        setLetters((prevLetters) => {
          if (letters.length > 0) [...prevLetters.pop()]
          return [...prevLetters]
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [letters])

  return (
    <div className="game">
      {letters} {index}
      <AnswerGrid letters={letters} word={word} index={index}/>
      <Keyboard onClick={handleInput} letters={letters} word={word} index={index}/>
    </div>
  )
}

export default App
