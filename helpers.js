module.exports.msgMatch = function (message, match) {
    return (message.includes(match))
}

module.exports.matchWord = function (message, match) {
    var array = message.split(' ')
    for (i = 0; i < array.length; i++){
        if (array[i] == match) {
            return true
        }
    }
    return false
}

module.exports.matchWordFromList = function (message, matches) {
    for (i = 0; i < matches.length; i++){
        if (exports.matchWord(message, matches[i])) {
            return true
        }
    }
    return false
}

//Match any of input
module.exports.msgMatchAny = function (message, array) {
    var conditionMet = false;
    array.forEach(element => {
        if (exports.msgMatch (message, element)){
        conditionMet = true
        }
    });
    return (conditionMet || array.length === 0)
}

//Match all of the input
module.exports.msgMatchAll = function (message, array) {
    array.forEach(element => {
        if (!exports.msgMatch (message, element)){
        return false
        }
    });
    return true
}

//Match in order
module.exports.msgMatchInOrder = function (message, array) { 
    var index = -1
    var current = -1
    var conditionMet = true

    array.forEach(element => {
        current = message.indexOf(element, (index + 1))
        if (current == -1){
        conditionMet = false
        }
        index = current
    });
    return conditionMet
}

module.exports.pickRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)]
}