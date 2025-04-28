import clsx from 'clsx'
import './modal.css'

export default function Modal({game}) {
    const classes = clsx('modal', game.gameOver && 'display')
    return (
        <div className={classes}>
            {game.gameWon ? 'You won!' : `It's so over...`}
        </div>
    )
}