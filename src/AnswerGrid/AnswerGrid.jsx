import { useEffect, useState } from 'react';
import './answergrid.css';
import { getColorClassGrid } from '../utils';
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
            return safePrevRowElements.map((prevElement_, index) => (
                <div className="answer-grid-row" key={`row${index}`}>
                    {
                        Array(5)
                        .fill(null)
                        .map((_any, i) => {
                            const colorClass = letters[index] ? getColorClassGrid(letters[index][i], word, word[i], index < game.guessRow) : null
                            const classNames = clsx('answer-grid-tile', colorClass)
                            return (
                                <div className={classNames} key={`tile${index}-${i}`}>
                                    {letters[index] ? letters[index][i] || '' : ''}
                                </div>
                            )
                        })
                    }
                </div>
            ))
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