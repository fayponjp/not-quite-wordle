import { useState, useEffect } from 'react'
import Keyboard from './Keyboard/keyboard'
import { generate } from 'random-words'
import './App.css'

function App() {
  const [word, setWord] = useState('')

  useEffect(()=> {
    setWord(generate({ minLength: 5, maxLength: 5}))
  }, [])

  return (
    <div className='game'>
      {word}<i class="fa-solid fa-delete-left"></i>
      <Keyboard/>
    </div>
  )
}

export default App
