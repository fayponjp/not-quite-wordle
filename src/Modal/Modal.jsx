import clsx from 'clsx'
import './modal.css'

export default function Modal({children, game}) {
    console.log(game)
    const classes = clsx('modal', game.gameOver && 'display')
    return (
        <div className={classes}>
            {children}
        </div>
    )
}