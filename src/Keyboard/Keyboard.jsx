import clsx from 'clsx'
import './keyboard.css'

export default function Keyboard({onClick, letters, word, enter, setEnter}) {
    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdRow = ['z' , 'x', 'c', 'v', 'b', 'n', 'm']

    function getColorClass(key) {
        for (let array of letters) {
            if (array.indexOf(key) === word.indexOf(key) && word.indexOf(key) >= 0 && enter.enter)  {
                return 'correct'
            } else if (array.includes(key) && word.includes(key) && enter.enter) {
                return 'close-guess'
            } else if (array.includes(key)) {
                return 'guess'
            }
        }
    }

    const [firstRowBtns, secondRowBtns, thirdRowBtns] = [firstRow, secondRow, thirdRow].map((array) => {
        return array.map(key => {
            let colorClass = getColorClass(key)

            const classNames = clsx('key', colorClass)
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