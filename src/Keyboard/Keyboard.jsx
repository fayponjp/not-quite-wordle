import clsx from 'clsx';
import './keyboard.css';
import { useRef } from 'react';

export default function Keyboard({
    onClick,
    letters,
    word,
    game,
    setGame,
    handleBackspace,
    handleEnter,
}) {
    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
    const correctLetters = useRef(new Map());
    const [firstRowBtns, secondRowBtns, thirdRowBtns] = [
        firstRow,
        secondRow,
        thirdRow,
    ].map((array) => {
        for (let i = 0; i < letters.length; i++) {
            if (i == game.guessRow - 1) {
                for (let j = 0; j < letters[i].length; j++) {
                    if (letters[i][j] === word[j]) {
                        correctLetters.current.set(letters[i][j], 'correct');
                    } else if (word.includes(letters[i][j])) {
                        const existsAndIsCorrect =
                            correctLetters.current.get(letters[i][j]) ===
                            'correct';
                        correctLetters.current.set(
                            letters[i][j],
                            existsAndIsCorrect ? 'correct' : 'close-guess'
                        );
                    } else {
                        correctLetters.current.set(letters[i][j], 'guess');
                    }
                }
            }
        }

        return array.map((key) => {
            const classNames = clsx('key', correctLetters.current.get(key));
            return (
                <button
                    className={classNames}
                    key={key}
                    onClick={() => onClick(key)}
                >
                    {key}
                </button>
            );
        });
    });

    secondRowBtns.unshift(<div className='half-key' key='half-key1'></div>);
    secondRowBtns.push(<div className='half-key' key='half-key2'></div>);
    thirdRowBtns.unshift(
        <button className='key key-wide' key='enter' onClick={handleEnter}>
            ENTER
        </button>
    );
    thirdRowBtns.push(
        <button className='key key-wide' key='delete' onClick={handleBackspace}>
            <i className='fa-solid fa-delete-left'></i>
        </button>
    );

    return (
        <div className='keyboard'>
            <div className='key-rows'>{firstRowBtns}</div>
            <div className='key-rows'>{secondRowBtns}</div>
            <div className='key-rows'>{thirdRowBtns}</div>
        </div>
    );
}
