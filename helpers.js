const l = require('./wordLists')

//match substring to string
module.exports.substringMatch = function (message, match) {
    //console.log(message + ' ?= ' + match)
    return (message.includes(match))
}

module.exports.warn = function (string){
    console.warn("\x1b[43m\x1b[30mWARN: " + string, "\x1b[0m")
}
module.exports.err = function (string){
    console.error("\x1b[41mERR: " + string, "\x1b[0m")
}
module.exports.succ = function (string){
    console.log("\x1b[42mSUCC: " + string, "\x1b[0m")
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

//Match any substring to input
module.exports.substringMatchAny = function (message, array) {
    if (array.length === 0) return true
    array.forEach(element => {
        if (exports.substringMatch(message, element)) {
            return true
        }
    });
    return false
}

//Match all of the input
module.exports.substringMatchAll = function (message, array) {
    array.forEach(element => {
        if (!exports.substringMatch(message, element)) {
            return false
        }
    });
    return true
}

//Match in order
module.exports.substringMatchInOrder = function (message, array) {
    var index = -1
    var current = -1

    for (i = 0; i < array.length; i++){
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
module.exports.matchChar = function (char, array) {
    char = char.toLowerCase()
    for (i = 0; i < array.length; i++) {
        if (char === array[i]){
            return true
        }
    }
    return false
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

//converts a string into a string representation of charcodes. It's required, I promise
module.exports.encode = function (string) {
    var output = "["
    var arr = string.split('')
    while (arr.length !== 0) {
        output += arr.pop().charCodeAt() + ((arr.length !== 0) ? ',' : ']')
    }
    return output
}

