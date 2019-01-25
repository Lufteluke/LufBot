module.exports.msgMatch = function (message, match) {
    //console.log(message + ' ?= ' + match)
    return (message.includes(match))
}

module.exports.matchWord = function (message, match) {
    var array = message.split(' ')
    for (var i = 0; i < array.length; i++) {
        //console.log(array[i] + ' ?= ' + match)
        if (array[i] == match) {
            return true
        }
    }
    return false
}

module.exports.matchWordFromList = function (message, matches) {
    for (var i = 0; i < matches.length; i++) {
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
        if (exports.msgMatch(message, element)) {
            conditionMet = true
        }
    });
    return (conditionMet || array.length === 0)
}

//Match all of the input
module.exports.msgMatchAll = function (message, array) {
    array.forEach(element => {
        if (!exports.msgMatch(message, element)) {
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
        if (current == -1) {
            conditionMet = false
        }
        index = current
    });
    return conditionMet
}

module.exports.pickRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)]
}

module.exports.replace = function (clean, allText, withText) {
    return clean.split(allText).join(withText)
}

module.exports.replaceList = function (clean, allInList, withText) {
    allInList.forEach(all => {
        clean = exports.replace(clean, all, withText)
    });
    return clean
}

module.exports.capitaliseFirst = function (string) {
    if (string.charAt(0) === null) return string
    else return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.coinflip = function (againstOne) {
    if (Math.floor(Math.random() * againstOne) === 0) {
        return true
    }
    else return false
}

module.exports.encode = function (string) {
    var output = "["
    var arr = string.split('')
    while (arr.length !== 0) {
        output += arr.pop().charCodeAt() + ((arr.length !== 0) ? ',' : '')
    }
    output += ']'
    return output
}

module.exports.findBalancedFactors = function (number) {

    //currently best factors
    var bestFactor = 1 //first factor
    var bestOther = number / bestFactor //second factor 
    var bestDifference = Math.abs(bestOther - bestFactor) //determine how close to balanced the equation is
    
    var bestOver = 0 //number to add later for optimisation
    var testOver = 0 //keep track of optimisation number
    


    //try deducting from total
    while (testOver <= 12) {

        //numbers to be evaluated
        var testFactor = 2 //first factor (we already know 1, so why start there?)
        var testOther = number / testFactor //second factor
        var testDifference = Math.abs(testFactor - testOther) //determine how close to balanced the equation is

        //no point in checking over half
        while (testFactor <= number / 2) {

            testOther = number / testFactor
            testDifference = Math.abs(testFactor - testOther)

            //console.log('Test! \n' + ' | Factor1: ' + testFactor + ' | Factor2: ' + testOther + ' | Number: ' + number + ' + ' + testOver)

            if (Number.isInteger(testOther) && testDifference + testOver < bestDifference) {
                bestFactor = testFactor
                bestOther = testOther
                bestOver = testOver
                bestDifference = testDifference
                //console.log('BEST! \n' + ' | Factor1: ' + bestFactor + ' | Factor2: ' + bestOther + ' | Number: ' + number + ' + ' + bestOver)
            }
            //else console.log('Denied!')
            testFactor++
        }
        number-- //reduce number to find
        testOver++ //add spare number
    }
    return [bestFactor, bestOther, bestOver]
}