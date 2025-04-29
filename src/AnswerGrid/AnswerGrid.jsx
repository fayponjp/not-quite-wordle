import { useEffect, useState } from 'react';
import './answergrid.css';
import clsx from 'clsx';

export default function AnswerGrid({ letters, word, game }) {
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

                return (<div className="answer-grid-row" key={`row${index}`}>
                    {
                        Array(5)
                        .fill(null)
                        .map((_any, i) => {
                            let colorClass = null
                            if (letters[index] && index < game.guessRow) {
                                const letter = letters[index][i]
                                if (letter === word[i]) {
                                    colorClass = 'correct'
                                    wordFrequency[letter]--
                                } else if (word.includes(letter) && wordFrequency[letter] > 0) {
                                    colorClass = 'close-guess'
                                    wordFrequency[letter]--
                                } else {
                                    colorClass = 'guess'
                                }
                            }
                            const classNames = clsx('answer-grid-tile', colorClass)
                            return (
                                <div className={classNames} key={`tile${index}-${i}`}>
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