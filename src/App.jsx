import { useState, useEffect, useRef } from 'react'
import Keyboard from './Keyboard/keyboard'
import AnswerGrid from './AnswerGrid/AnswerGrid'
import { generate } from 'random-words'
import wordExists from 'word-exists'
import Modal from './Modal/Modal'
import './App.css'

function App() {
  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }).split(''))
  const [game, setGame] = useState({guessRow: 0, gameOver: false, gameWon: false})
  const [letters, setLetters] = useState([[]])
  const rowRef = useRef()

  function handleInput(letterInput) {
    !game.gameOver && setLetters(prevLetters => {
      const currentLetters = [...prevLetters]
      currentLetters[game.guessRow] = (currentLetters[game.guessRow].length < 5) ? [...currentLetters[game.guessRow], letterInput] : currentLetters[game.guessRow]
      return currentLetters
    })
  }

  function handleBackspace() {
    setLetters(prevLetters => {
      const currentLetters = [...prevLetters]
      if (currentLetters[game.guessRow].length > 0) {
        currentLetters[game.guessRow] = currentLetters[game.guessRow].slice(0, -1)
      }
      return currentLetters
    })
  }

  function handleEnter() {
    const currentWord = letters[game.guessRow].join('')
    if (letters[game.guessRow].length >= 5) {
      if (wordExists(currentWord)) {
        setLetters(prevLetters => [...prevLetters, []])
        setGame(prevEnter => {
          return {
            ...prevEnter, 
            gameOver: currentWord === word.join('') || prevEnter.guessRow + 1 === 6,
            guessRow: (prevEnter.guessRow + 1), 
            gameWon: currentWord === word.join('')
          }
        })
      } else {
        if (rowRef.current) {
          rowRef.current.classList.add('shake')
          setTimeout(() => rowRef.current.classList.remove('shake'), 250)
        }
      }
    }
  }
  
  function handleKeyDown(e) {
    const rex = /^[A-Za-z]$/
    if (rex.test(e.key)) handleInput(e.key)

    if (e.key === 'Enter') {
      handleEnter()
    }

    if (e.key === 'Backspace') {
      handleBackspace()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [letters])

  return (
    <div className="game">
      <AnswerGrid 
        letters={letters} 
        word={word} 
        game={game}
        rowRef={rowRef}
      />

      <Keyboard 
        onClick={handleInput} 
        letters={letters} 
        word={word} 
        game={game}
        setGame={setGame}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter}
      />

      <Modal
        game={game}
      />
      {word}
    </div>
  )
}

export default App
