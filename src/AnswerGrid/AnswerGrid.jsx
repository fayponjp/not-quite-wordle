import { useEffect, useState } from 'react';
import './answergrid.css';

export default function AnswerGrid({ letters, word, enter }) {
    const [rowElements, setRowElements] = useState(createRowElements())

    function createRowElements() {
        return Array(6)
                .fill(null)
                .map((_any, i) => <div className="answer-grid-row" key={`row${i}`}></div>)
    }

    useEffect(() => {
        setRowElements((prevRowElements) => {
            const safePrevRowElements = prevRowElements || createRowElements()
            return safePrevRowElements.map((prevElement, index) => (
                <div className="answer-grid-row" key={`row${index}`}>
                    {
                        Array(5)
                        .fill(null)
                        .map((_any, i) => (
                            <div className="answer-grid-tile" key={`tile${index}-${i}`}>
                                {letters[index] ? letters[index][i] || '' : ''}
                            </div>
                        ))
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