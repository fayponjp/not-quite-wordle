function getColorClass(key, letters, enter, word) {
    for (let i = 0; i < letters.length; i++) {
        if (i < enter.index) {
            if (letters[i].indexOf(key) === word.indexOf(key) && word.indexOf(key) >= 0 && enter.enter)  {
                return 'correct'
            } else if (letters[i].includes(key) && word.includes(key) && enter.enter) {
                return 'close-guess'
            } else if (letters[i].includes(key)) {
                return 'guess'
            }
        }
    }
}

export { getColorClass }