import { useEffect, useState } from 'react';
import './answergrid.css';
import { getColorClass } from '../utils';
import clsx from 'clsx';

export default function AnswerGrid({ letters, word, enter }) {
    const [rowElements, setRowElements] = useState(createRowElements())

    function createRowElements() {
        return Array(6)
                .fill(null)
                .map((_any, i) => <div className="answer-grid-row" key={`row${i}`}></div>)
    }

    function getColorClassGrid(letter, word, wordLetter, previousLoop) {
        if (previousLoop) {
            if (letter === wordLetter) {
                return 'correct'
            } else if (word.includes(letter)) {
                return 'close-guess'
            }
        }
    }

    useEffect(() => {
        setRowElements((prevRowElements) => {
            const safePrevRowElements = prevRowElements || createRowElements()
            return safePrevRowElements.map((prevElement_, index) => (
                <div className="answer-grid-row" key={`row${index}`}>
                    {
                        Array(5)
                        .fill(null)
                        .map((_any, i) => {
                            const colorClass = letters[index] ? getColorClassGrid(letters[index][i], word, word[i], index < enter.index) : null
                            const classNames = clsx('answer-grid-tile', colorClass)
                            return (<div className={classNames} key={`tile${index}-${i}`}>
                                {letters[index] ? letters[index][i] || '' : ''}
                            </div>)
                        })
                    }
                </div>
            ))
        })
    }, [letters, enter])

    return (
        <div className="answers">
            <div className="answer-grid">
                {rowElements}
            </div>
        </div>
    )
}