import { useState, useEffect } from 'react';
import Keyboard from './Keyboard/keyboard';
import AnswerGrid from './AnswerGrid/AnswerGrid';
import { generate } from 'random-words';
import './App.css';

function App() {
  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }).split(''));
  const [letters, setLetters] = useState([]);
  const [index, setIndex] = useState(0);

  function handleLetterInput(inputLetter) {
    const rex = /^[A-Za-z]$/;
    if (rex.test(inputLetter)) {
      setLetters(prevLetters => {
        if (prevLetters.length < 5) return [...prevLetters, inputLetter]
        return prevLetters
      })
    }
  }

  useEffect(() => {
    if (letters.length > 0) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [letters]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleLetterInput(e.key);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="game">
      {letters} {index}
      <AnswerGrid letters={letters} word={word} />
      <Keyboard onClick={handleLetterInput} />
    </div>
  );
}

export default App;
