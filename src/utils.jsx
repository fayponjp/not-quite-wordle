function getColorClass(key, letters, enter, word, correctLetters) {
    // look if more than one instance of the letter appears, if only once close guess for that letter only once. if more than once allow more than once
    // maybe compare arrays instead? return an object array where each object is the key and class
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