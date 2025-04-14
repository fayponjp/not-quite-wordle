import { useEffect, useState } from 'react';
import './answergrid.css';

export default function AnswerGrid({ letters, word, index }) {
    const [rowElements, setRowElements] = useState(createRowElements());

    function createRowElements() {
        return Array(6)
                .fill(null)
                .map((_any, i) => <div className="answer-grid-row" key={`row${i}`}></div>)
    }

    useEffect(() => {
        setRowElements((prevRowElements) => {
            const safePrevRowElements = prevRowElements || createRowElements()
            return safePrevRowElements.map((prevElement, iterator) => (
                <div className="answer-grid-row" key={`row${iterator}`}>
                    {Array(5)
                        .fill(null)
                        .map((_any, i) => (
                            <div className="answer-grid-tile" key={`tile${iterator}-${i}`}>
                                {index === iterator ? letters[i] || '' : ''}
                            </div>
                        ))}
                </div>
            ));
        });
    }, [letters, index])

    return (
        <div className="answers">
            <div className="answer-grid">
                {rowElements}
            </div>
        </div>
    );
}