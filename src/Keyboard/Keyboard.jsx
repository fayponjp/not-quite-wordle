import clsx from 'clsx'
import './keyboard.css'
import { getColorClass } from '../utils'
import { useRef } from 'react'

export default function Keyboard({onClick, letters, word, enter, setEnter}) {
    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdRow = ['z' , 'x', 'c', 'v', 'b', 'n', 'm']
    const correctLetters = useRef([])
    const [firstRowBtns, secondRowBtns, thirdRowBtns] = [firstRow, secondRow, thirdRow].map((array) => {
        return array.map(key => {
            const colorClass = getColorClass(key, letters, enter, word, correctLetters.current)
            if (colorClass === 'correct' && !correctLetters.current.includes(key)) correctLetters.current.push(key)
            const classNames = clsx('key', correctLetters.current.includes(key) ? 'correct' : colorClass)
            return <button className={classNames} key={key} onClick={() => onClick(key)}>{key}</button>
        })
    })

    secondRowBtns.unshift(<div className='half-key' key='half-key1'></div>)
    secondRowBtns.push(<div className='half-key' key='half-key2'></div>)
    thirdRowBtns.unshift(<button className='key key-wide' key='enter'>ENTER</button>)
    thirdRowBtns.push(<button className='key key-wide' key='delete'><i className='fa-solid fa-delete-left'></i></button>)

    return (
        <div className='keyboard'>
            <div className="key-rows">
                {firstRowBtns}
            </div>
            <div className="key-rows">
                {secondRowBtns}
            </div>
            <div className="key-rows">
                {thirdRowBtns}
            </div>
        </div>
    )
}