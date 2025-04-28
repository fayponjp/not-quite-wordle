function getColorClass(key, letters, enter, word, correctLetters) {
    for (let i = 0; i < letters.length; i++) {
        if (i == enter.index - 1) {
            if ((letters[i].indexOf(key) === word.indexOf(key) && word.indexOf(key) >= 0) || correctLetters.includes(key))  {
                if (!correctLetters.includes(key)) correctLetters.push(key)
                return 'correct'
            } else if (letters[i].includes(key) && word.includes(key)) {
                return 'close-guess'
            } else if (letters[i].includes(key)) {
                return 'guess'
            }
        }
    }
}

function getColorClassGrid(letter, word, wordLetter, previousLoop) {
    if (previousLoop) {
        if (letter === wordLetter) {
            return 'correct'
        } else if (word.includes(letter)) {
            return 'close-guess'
        } else {
            return 'guess'
        }
    }
}

export { getColorClass, getColorClassGrid }