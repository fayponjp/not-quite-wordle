import { useEffect, useState } from 'react';
import './answergrid.css';
import clsx from 'clsx';

export default function AnswerGrid({ letters, word, game, rowRef }) {
    const [rowElements, setRowElements] = useState(createRowElements())

    function createRowElements() {
        return Array(6)
                .fill(null)
                .map((_any, i) => <div className="answer-grid-row" key={`row${i}`}></div>)
    }

    useEffect(() => {
        setRowElements((prevRowElements) => {
            const safePrevRowElements = prevRowElements || createRowElements()
            return safePrevRowElements.map((prevElement_, index) => {
                const wordFrequency = {}

                word.forEach(char => wordFrequency[char] = (wordFrequency[char] || 0) + 1)
                const truthCheck = (letters[index] && letters[index].length === 5 && letters.length - 1 === index)
                return (<div className='answer-grid-row' key={`row${index}`} ref={(letters[index] && letters[index].length === 5 && letters.length - 1 === index) && rowRef || null}>
                    {
                        Array(5)
                        .fill(null)
                        .map((_any, i) => {
                            let colorClass = null
                            if (letters[index] && index < game.guessRow) {
                                const letter = letters[index][i]
                                if (letter === word[i]) {
                                    colorClass = 'correct ' + `flip${i}`
                                    wordFrequency[letter]--
                                } else if (word.includes(letter) && wordFrequency[letter] > 0) {
                                    colorClass = 'close-guess ' + `flip${i}`
                                    wordFrequency[letter]--
                                } else {
                                    colorClass = 'guess ' + `flip${i}`
                                }
                            }

                            const popClass = (letters[index] && letters[index][i]) && 'pop'
                            const classNames = clsx('answer-grid-tile', colorClass, popClass)
                            return (
                                <div className={classNames} key={`tile${index}-${i}`} style={{transitionDelay: `${i*100}ms`}}>
                                    {letters[index] ? letters[index][i] || '' : ''}
                                </div>
                            )
                        })
                    }
                </div>)
            })
        })
    }, [letters, game])

    return (
        <div className="answers">
            <div className="answer-grid">
                {rowElements}
            </div>
        </div>
    )
}