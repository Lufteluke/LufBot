const h = require('./helpers')
const l = require('./wordLists')

module.exports.piglatinEncode = function (clean) {

    var words = clean.toLowerCase().split(' ')
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
        out += remainder + leadingConsonants + ((leadingConsonants.length==0)? "way" : "ay") + symbols + " "
    });
    return h.capitaliseFirst(out)
}

module.exports.piglatinDecode = function (clean) {

    var words = clean.toLowerCase().split(' ')
    var out = ""
    
    words.forEach(word => {
        var remainder = word
        var leadingConsonants = ""
        var symbols = ""
        var ayRemoved = false

        while (remainder.length > 0) {
            var lastLetter = remainder.slice(-1)
            
            if (remainder.length <= 1) {//word is very short
                break
            }
            else if (h.isSymbol(lastLetter)) {//remove symbols
                symbols = lastLetter + symbols
                remainder = remainder.slice(0, -1)
            }
            else if (!ayRemoved) {
                ayRemoved = (remainder = remainder.slice(0, -2)) //removes ay
            }
            else if (h.isConsonant(lastLetter)) {//move consonant
                remainder = remainder.slice(0, -1)
                if (lastLetter == 'w') break
                leadingConsonants = lastLetter + leadingConsonants
                break
            }
            else break         
        }
        out += leadingConsonants + remainder + symbols + " "
    });
    return h.capitaliseFirst(out)
}