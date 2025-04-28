import { useState, useEffect } from 'react'
import Keyboard from './Keyboard/keyboard'
import AnswerGrid from './AnswerGrid/AnswerGrid'
import { generate } from 'random-words'
import wordExists from 'word-exists'
import Modal from './Modal/Modal'
import './App.css'

function App() {
  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }).split(''))
  const [game, setGame] = useState({guessRow: 0, gameOver: false})
  const [letters, setLetters] = useState([[]])

  function handleInput(letterInput) {
    setLetters(prevLetters => {
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
    if (wordExists(currentWord) && letters[game.guessRow].length >= 5) {
      setLetters(prevLetters => [...prevLetters, []])
      setGame(prevEnter => {

        return {...prevEnter, guessRow: (prevEnter.guessRow + 1), gameOver: currentWord === word.join('')}
      })
      // if (currentWord === word.join('')) {
      //   console.log("Winning state")
      //   setGame(prevEnter => ({...prevEnter, gameOver: true}))
      // } else {

      // }
    }
  }
  
  useEffect(() => {
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

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [letters])

  return (
    <div className="game">
      {letters} {game.guessRow}
      <AnswerGrid 
        letters={letters} 
        word={word} 
        game={game}
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
        {word}
      <Modal
        game={game}
      >Content</Modal>
    </div>
  )
}

export default App
