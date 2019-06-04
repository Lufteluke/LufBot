const h = require('./helpers')

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
            var lastLetter = remainder.charAt(remainder.length-1)

            if (h.isSymbol(lastLetter)) {
                symbols += remainder.charAt(remainder.length-1)
                remainder = remainder.slice(0, -1)
            }   
            else break         
        }
        out += remainder + leadingConsonants + "ay" + symbols + " "
    });
    return h.capitaliseFirst(out)
}