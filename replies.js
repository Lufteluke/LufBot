const l = require('./wordLists')
const h = require('./helpers')
const c = require('./commands')

module.exports.asteriskAction = function (clean, from) { //todo get only center
    clean = h.replace(clean, '*', '')
    if (h.matchWord(clean, 'you')) {
        return '*' + clean + ' back!~*'
    }
    else if (h.matchWordFromList(clean, l.names)) {
        l.names.forEach(name => {
            clean = clean.replace(name, from)
            return '*' + clean + '*'
        });
    }
    else {
        return '0w0 *' + clean + ' all over ' + from + '*'
    }
    return '*Confused*'
}

module.exports.owo = function (clean) {
    return h.replace(h.replaceList(clean, ['l', 'r'], 'w'), 'u', 'oo')
}

module.exports.default = function (from) {
    return h.pickRandom(l.iDontUnderstand) + '. ' + h.pickRandom(l.doMe) + ', ' + from
}

module.exports.who = function (clean, from) {
    const doer = h.pickRandom(l.subjects.concat(from))
    if (!h.matchWord('who')) {
        return doer + clean.replace('?', '!')
    }
    else return clean.replace('who', doer).replace('?', '!')
}

module.exports.beep = function (clean) {
    clean = h.replace(clean, 'ee', 'ᛟ')
    clean = h.replace(clean, 'oo', 'ee')
    return h.replace(clean, 'ᛟ', 'oo')
}

module.exports.fake = function (clean) {
    if (!h.matchWord(clean, 'fake')) {
        return h.replace(clean, 'gay', 'fake and gay')
    }
    else if (!h.matchWord(clean, 'gay')) {
        return h.replace(clean, 'fake', 'fake and gay')
    }
    else return h.replace(h.replace(h.replace(clean, 'fake', 'ᛟ'), 'gay', 'fake'), 'ᛟ', 'gay')
}

module.exports.navy = function () {
    return l.navy
}

module.exports.conspiracy = function () {
    return (
        h.pickRandom(l.conspiracy[0]) +
        h.pickRandom(l.conspiracy[1]) + 'can\'t ' +
        h.pickRandom(l.conspiracy[2]) +
        h.pickRandom(l.conspiracy[3]) +
        h.pickRandom(l.conspiracy[4])
    )
}

module.exports.fact = function () {
    return exports.randomFact()
    //return h.pickRandom(l.facts)
}

module.exports.randomFact = function (from) {
    return [
        h.pickRandom(l.subjects),
        h.pickRandom(l.activities),
        h.pickRandom(l.objects.concat(l.subjects.concat(from))),
        h.pickRandom(l.modifiers)].join(' ')
}

module.exports.about = function (from) {
    return 'LufBot V0.1 at your service. I was made to confuse. Why were you made, ' + from + '?'
}

module.exports.good = function (from) {
    return "I aim to please!, you're pretty " + h.pickRandom(l.good) + ' yourself, ' + from
}

module.exports.bad = function (from) {
    return "I'm sorry, but you're pretty " + h.pickRandom(l.bad) + ' yourself, ' + from
}

module.exports.help = function () {
    var returnVar = ''
    c.commands.forEach(command => {
        returnVar += command + ' - '
    });
    return 'LufBot responds to these commands: ' + returnVar
}

module.exports.yiff = function (clean) {
    return "I can't do that, you probably meant to use \n/yiff@e621bot " + clean
}

module.exports.bork = function (clean, level) {
    if (clean.length === 0) return h.pickRandom(l.boerk)

    const borkSplit = h.replace(h.replaceList(clean, ['a', 'o'], 'u'), 'th', 'ze').split(' ')
    var returnVar = ''
    borkSplit.forEach(word => {
        if (h.coinflip(level)) {
            returnVar += h.pickRandom(l.boerk) + ' '
        }
        else {
            returnVar += word + ' '
        }
    });
    return returnVar
}

module.exports.dyr = function (clean, level) {
    if (clean.length === 0) return 'dyr'
    var returnVar = ''
    clean.split(' ').forEach(word => {
        if (h.coinflip(level)) {
            returnVar += word.split(/\b/)[0] + h.pickRandom(l.lufCompounds) + ' '
        }
        else {
            returnVar += word + ' '
        }
    });
    return returnVar
}

module.exports.lufReplace = function (clean) {
    l.lufWords.forEach(replacement => {
        clean = h.replace(clean, replacement[0], replacement[1])
    });

    return exports.dyr(clean, 5)
}

module.exports.brainfuck = function (program) {
    var tape = [0, 0, 0, 0]
    var positiveTape = tape
    var negativeTape = []
    var cellIndex = 0
    var cell = 0
    var index = 0
    var loopStack = []
    var output = ""
    var searchLoop = false
    var iteration = 0
    const terminate = 5000

    while (program[index] != null) {



        while (searchLoop) {
            console.log('search ' + program[index])
            searchLoop = (program[index] != ']')
            if (searchLoop) console.log("Found ]!")
            index++
        }

        /* console.log("Program: " + program.slice(0,index).toString() + '____' + program[index] + '____' + program.slice(index+1).toString() ) */

        switch (program[index]) {
            case '>': //pointer right
                cellIndex++
                cell = h.negativeIndex(cellIndex)

                if (cellIndex > 0) {
                    tape = positiveTape
                }
                else {
                    tape = negativeTape
                }

                if (typeof tape[cell] === 'undefined') {
                    //console.log("adding cell")
                    tape.push(0)
                }

                index++
                break



            case '<': //pointer left
                cellIndex--
                cell = h.negativeIndex(cellIndex)

                if (cellIndex >= 0) {
                    //console.log('tape is positive')
                    tape = positiveTape
                }
                else {
                    //console.log('tape is negative')
                    tape = negativeTape
                }

                if (typeof tape[cell] === 'undefined') {
                    console.log("adding cell")
                    tape.push(0)
                }

                index++
                break



            case '+': //increment memory
                tape[cell]++
                index++
                break



            case '-': //decrement memory

                tape[cell]--
                index++
                break



            case '.': //output
                output += String.fromCharCode(tape[cell])
                index++
                break;



            case ',': //input
                //TODO
                tape[cell] = 'F'.charCodeAt(0)
                index++
                break



            case '[': //while
                if (tape[cell] <= 0) { //break
                    searchLoop = true
                }
                else { //add "[" to stack
                    loopStack.push(index)
                    index++
                }
                break



            case ']': //do
                if (tape[cell] <= 0) {//break
                    loopStack.pop()
                    index++
                }
                else { //break
                    index = loopStack[loopStack.length - 1] + 1
                }
                break



            default:
                /*  console.log('Non-program char: ' + program[index]) */
                index++
                break
        }


        iteration++
        /* console.log('#' + iteration + ' | Index: ' + index + " | Cellindex: " + cellIndex + " | LoopStack: " + loopStack.toString())
        console.log('Tape: ' + negativeTape.reverse().concat(positiveTape.toString())) */

        if (iteration == terminate) {
            console.log("Terminated for taking too long! Output: " + output)
            return "Output: " + output + '\n' + negativeTape.reverse().toString() + ' -|+ ' + positiveTape.toString()
        }
    }
    return "Output: " + output + '\n' + negativeTape.reverse().toString() + ' -|+ ' + positiveTape.toString()
}