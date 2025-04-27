import { useState, useEffect } from 'react'
import Keyboard from './Keyboard/keyboard'
import AnswerGrid from './AnswerGrid/AnswerGrid'
import { generate } from 'random-words'
import wordExists from 'word-exists'
import './App.css'

function App() {
  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }).split(''))
  const [enter, setEnter] = useState({index: 0, enter: false})
  const [letters, setLetters] = useState([[]])

  function handleInput(letterInput) {
    setLetters(prevLetters => {
      const currentLetters = [...prevLetters]
      currentLetters[enter.index] = (currentLetters[enter.index].length < 5) ? [...currentLetters[enter.index], letterInput] : currentLetters[enter.index]
      return currentLetters
    })
  }

  function handleBackspace() {
    setLetters(prevLetters => {
      const currentLetters = [...prevLetters]
      if (currentLetters[enter.index].length > 0) {
        currentLetters[enter.index] = currentLetters[enter.index].slice(0, -1)
      }
      return currentLetters
    })
  }
  
  useEffect(() => {
    function handleKeyDown(e) {
      const rex = /^[A-Za-z]$/
      if (rex.test(e.key)) handleInput(e.key)

      if (letters[enter.index].length >= 5 && e.key === 'Enter') {
        if (wordExists(letters[enter.index].join(''))) {
          setLetters(prevLetters => [...prevLetters, []])
          setEnter(prevEnter => ({index: (prevEnter.index + 1), enter:true}))
        }
      }

      if (e.key === 'Backspace') {
        handleBackspace()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [letters])

  return (
    <div className="game">
      {letters} {enter.index}
      <AnswerGrid 
        letters={letters} 
        word={word} 
        enter={enter}
      />

      <Keyboard 
        onClick={handleInput} 
        letters={letters} 
        word={word} 
        enter={enter}
        setEnter={setEnter}
        handleBackspace={handleBackspace}
      />
        {word}
    </div>
  )
}

export default App
