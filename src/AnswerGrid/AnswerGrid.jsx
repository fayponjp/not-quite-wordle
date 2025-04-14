import { useState } from 'react';
import './answergrid.css'

export default function AnswerGrid({letters, word}) {
    const [grid, setGrid] = useState();
    const rowElements = []
    const rowTiles = []

    for (let i = 0; i < 5; i++) {
        rowTiles.push(<div className='answer-grid-tile' key={`tile${i}i`}></div>)
    }

    for (let i = 0; i < 6; i++) {
        rowElements.push(<div className='answer-grid-row' key={`row${i}i`}>{rowTiles}</div>)
    }
    
    return (
        <div className="answers">
            <div className='answer-grid'>
                {rowElements}
            </div>
        </div>
    )
}