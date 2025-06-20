import clsx from 'clsx';
import './modal.css';
import { useState } from 'react';

export default function Modal({ game, letters, word }) {
    const [open, setOpen] = useState(true);

    function handleModalClose() {
        setOpen(false);
    }

    return (
        <>
            <div className={clsx('modal', game.gameOver && 'display')}>
                {game.gameWon ? 'You won!' : `It's so over...`}
            </div>
            <div
                className={clsx(
                    'modal-wide',
                    game.gameOver && open && 'display'
                )}
            >
                <button onClick={handleModalClose}>X</button>
                <h2>{game.gameWon ? 'Congratulations!' : `Nice effort!`}</h2>
                <div>
                    {game.gameWon
                        ? `You've guessed the word in ${
                              letters.length - 1
                          } attempts!`
                        : `The word was ${word.join('')}!`}
                </div>
            </div>
        </>
    );
}
