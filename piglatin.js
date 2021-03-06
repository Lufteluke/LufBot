/*
Translates to and from pig latin, keep in mind this is fundamentally lossy
*/

const h = require('./helpers')
const l = require('./wordLists')
const ending = "ay"
const vowelReplace = "v"
const noVowelCommand = "no" + vowelReplace + ending


module.exports.encode = function (clean) {

    var words =  chkCommand(clean.toLowerCase())
    var vowRep = (words.length==clean.length)? vowelReplace : ""
    words = words.split(' ')
    var out = ""

    words.forEach(word => {
        if (word.length == 0) return
        var remainder = word
        var leadingConsonants = ""
        var symbols = ""

        while (remainder.length > 1) {
            var firstLetter = remainder.charAt(0)

            if (h.isConsonant(firstLetter)) {
                    leadingConsonants += firstLetter
                    remainder = remainder.slice(1) 
            }   
            else break         
        }

        while (remainder.length > 0) {
            var lastLetter = remainder.slice(-1)

            if (h.isSymbol(lastLetter)) {
                symbols += lastLetter
                remainder = remainder.slice(0, -1)
            }   
            else break         
        }
        out += remainder + leadingConsonants + ((leadingConsonants.length==0)? vowRep : "") + ending + symbols + " "
    });
    return h.capitaliseFirst(out)
}

module.exports.decode = function (clean) {
    var words =  chkCommand(clean.toLowerCase())
    var vowRep = (words.length==clean.length)? vowelReplace : ""
    words = words.split(' ')
    var out = ""
    
    words.forEach(word => {
        var remainder = word
        var leadingConsonants = ""
        var symbols = ""
        var ayRemoved = false

        while (remainder.length > 1) {
            var lastLetter = remainder.slice(-1)
            if (h.isSymbol(lastLetter)) {//remove symbols
                symbols = lastLetter + symbols
                remainder = remainder.slice(0, -1)
            }
            else if (!ayRemoved && h.substringMatch(remainder, ending)) {
                ayRemoved = (remainder = remainder.slice(0, -2)) //removes ay
            }
            else if (h.isConsonant(lastLetter)) {//move consonant
                remainder = remainder.slice(0, -1)
                if (lastLetter == vowRep) break
                leadingConsonants = lastLetter + leadingConsonants
                break
            }
            else break         
        }
        out += leadingConsonants + remainder + symbols + " "
    });
    return h.capitaliseFirst(out)
}

function chkCommand (clean) {
    if (h.matchWord(clean, noVowelCommand)){
        clean = h.replace(clean, noVowelCommand, "")
    }
    return clean
}