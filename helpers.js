/*
Contain helper classes that help unify the way that searches and certain fucntions are done (such as logging).
Many of the functions are redundant, but they're there for ease of changing and future optimisation. 
Please use them, even if there are simple replacements.
*/

const l = require('./wordLists')

module.exports.warn = function (string) {
    console.warn(l.style.txt.black + l.style.bg.yellow + "WARN: " + string + l.style.reset)
}
module.exports.err = function (string) {
    console.error(l.style.bg.red + l.style.underline + l.style.txt.yellow + "ERROR: " + string + l.style.reset)
}
module.exports.succ = function (string) {
    console.log(l.style.txt.green + "✔ " + string + l.style.reset)
}
module.exports.info = function (string) {
    console.log(l.style.txt.black + l.style.bold + l.style.underline + l.style.bg.white + string + l.style.reset)
}

//returns true if a word is contained within.
module.exports.matchWordWithSymbol = function (message, match, withSymbols) {
    if (!withSymbols) {
        message = exports.replaceList(message, l.symbols, '')
    }
    var array = message.toLowerCase().split(' ')
    for (var i = 0; i < array.length; i++) {
        if (array[i] == match) {
            return true
        }
    }
    return false
}

//returns true if a word is contained within. Ignores symbols
module.exports.matchWord = function (message, match) {
    return exports.matchWordWithSymbol(message, match, false)
}

//returns true if a word matches any word in a list  
module.exports.matchWordFromListWithSymbols = function (message, matches, withSymbols) {
    for (var i = 0; i < matches.length; i++) {
        if (exports.matchWordWithSymbol(message, matches[i], withSymbols)) {
            return true
        }
    }
    return false
}

//returns true if a word matches any word in a list  
module.exports.matchWordFromList = function (message, matches) {
    return exports.matchWordFromListWithSymbols(message, matches, false)
}

//returns true if a letter is in an array
module.exports.matchChar = function (char, array) {
    char = char.toLowerCase()
    for (i = 0; i < array.length; i++) {
        if (char == array[i]) {
            return true
        }
    }
    return false
}

//match substring to string, option to use case sensitive
module.exports.substringMatchCase = function (message, match, caseSensitive) {
    if (!caseSensitive) {
        message = message.toLowerCase()
        match = match.toLowerCase()
    }
    return (message.includes(match))
}

//match substring to string, case sensitive
module.exports.substringMatch = function (message, match) {
    return exports.substringMatchCase(message, match, true)
}

//Match any substring to input
module.exports.substringMatchAny = function (message, array) {
    if (array.length === 0) return true
    for (var i = 0; i < array.length; i++) {
        if (exports.substringMatch(message, array[i])) {
            return true
        }
    }
    return false
}

//Match all of the input
module.exports.substringMatchAll = function (message, array) {
    for (var i = 0; i < array.length; i++) {
        if (!exports.substringMatch(message, array[i])) {
            return false
        }
    }
    return true
}

//Match in order
module.exports.substringMatchInOrder = function (message, array) {
    var index = -1
    var current = -1

    for (i = 0; i < array.length; i++) {
        current = message.indexOf(array[i], (index + 1))
        if (current == -1) {
            return false
        }
        index = current
    }
    return true
}

//picks random element from array
module.exports.pickRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)]
}

//replaces whole words, no substings. Case sensitive
module.exports.replaceWordWithSymbols = function (clean, word, withWord, withSymbols) {
    
    if (!withSymbols) {
        clean = exports.replaceList(clean, l.symbols, '')
    }

    var array = clean.toLowerCase().split(' ')
    for (let i = 0; i < array.length; i++) {
        if (array[i] == word) {
            array[i] = withWord
        }
    }
    return array.join(' ')
}

//replaces whole words, no substings
module.exports.replaceWord = function (clean, word, withWord) {
    return exports.replaceWordWithSymbols(clean, word, withWord, false)
}

//swaps whole words, no substings
module.exports.swapWords = function (clean, a, b) {
    clean = exports.replaceWord(clean, a, 'ᛟ')
    clean = exports.replaceWord(clean, b, a)
    clean = exports.replaceWord(clean, 'ᛟ', b)
    return clean
}

//replaces all words in a string with another string. Case sensitive
module.exports.replace = function (clean, allText, withText) {
    return clean.split(allText).join(withText)
}


//same as replace, but for all items in a list. Case sensitive
module.exports.replaceList = function (clean, allInList, withText) {
    allInList.forEach(all => {
        clean = exports.replace(clean, all, withText)
    });
    return clean
}

//swaps two substrings, a will replace b, b will replace a
module.exports.swap = function (clean, a, b) {
    clean = exports.replace(clean, a, 'ᛟ')
    clean = exports.replace(clean, b, a)
    clean = exports.replace(clean, 'ᛟ', b)
    return clean
}

//capitalises first letter in the first word
module.exports.capitaliseFirst = function (string) {
    if (string.charAt(0) === null) return string
    else return string.charAt(0).toUpperCase() + string.slice(1)
}

//capitalises first letter in the first word and after symbols
module.exports.capitalise = function (string) {
    //todo
}

//returns true if a letter is a consonant
module.exports.isConsonant = function (char) {
    return exports.matchChar(char, l.consonants)
}

//returns true if a letter is a vowel
module.exports.isVowel = function (char) {
    return exports.matchChar(char, l.vowels)
}

//returns true if a letter is a vowel
module.exports.isSymbol = function (char) {
    return exports.matchChar(char, l.symbols)
}

//picks true/false based on a 1/x odds
module.exports.coinflip = function (againstOne) {
    if (Math.floor(Math.random() * againstOne) === 0) {
        return true
    }
    else return false
}

//converts a string into a string representation of charcodes.
module.exports.encodeToCharCodeArrayString = function (string) {
    var arr = string.split('')
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charCodeAt(0)
    }
    return JSON.stringify(arr)
}

//strips a string of command and makes lower case
module.exports.clean = function (string) {
}