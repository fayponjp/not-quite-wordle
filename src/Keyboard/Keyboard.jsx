import './keyboard.css'

export default function Keyboard() {
    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const thirdRow = ['z' , 'x', 'c', 'v', 'b', 'n', 'm'];
    const rowBtns =  [firstRow, secondRow, thirdRow].map((array) => {
        return (<div className='key-rows'>{array.map(key => {
            return <button className='key'>{key}</button>
        })}</div>)
    })

    console.log(rowBtns)

    return (
        <div className='keyboard'>
            {rowBtns}
        </div>
    )
}