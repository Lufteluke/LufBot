module.exports.msgMatch = function (message, match) {
    return (message.includes(match))
}

module.exports.msgMatchWord = function (message, match) {//TODO
    return (message.includes(match))
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