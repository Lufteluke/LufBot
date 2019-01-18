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
    var negativeTape = [0,0,0,0]
    var positiveTape = tape
    
    var cellIndex = 0
    var cell = cellIndex
    var index = 0
    var iteration = 0

    var loopStack = []
    var searchLoop = 0

    var output = ""
    var returnVar = ""
    var programDump = ""

    const terminate = 10000
    const wrapCell = !h.matchWord(program, "nowrap")

    

    while (program[index] != null) {
        iteration++


        while (searchLoop != 0) {
            if (program[index] == undefined) break
            if (program[index] == '[') {
                searchLoop ++ 
            }

            else if (program[index] == ']') {
                searchLoop --
            }

            if (searchLoop == 0) console.log("Found ]")
            index ++
        }

        /* console.log(
        '#' + iteration + 
        " Program: " + program.slice(0,index).toString() +
        '____' + program[index] +
        '____' + program.slice(index+1).toString() +
        " | Cell: " + tape[cell]) */

        switch (program[index]) {
            case undefined:
                break

            case '>': //pointer right
                cellIndex++
                cell = h.negativeIndex(cellIndex)

                if (cellIndex >= 0) {
                    tape = positiveTape
                }
                else {
                    tape = negativeTape
                }

                if (typeof tape[cell] === 'undefined') {
                    //console.log("adding cells")
                    tape.push(0, 0, 0, 0)
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
                    //console.log("adding cells")
                    tape.push(0, 0, 0, 0)
                }

                index++
                break



            case '+': //increment memory
                tape[cell]++
                index++
                if (wrapCell && tape[cell] >= 256) tape[cell] = 0
                break



            case '-': //decrement memory

                tape[cell]--
                index++
                if (wrapCell && tape[cell] <= -1) tape[cell] = 255
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
                if (tape[cell] == 0) { //break
                    searchLoop = 1
                }
                else { //add "[" to stack
                    loopStack.push(index)
                }
                index++
                break



            case ']': //do
                if (tape[cell] == 0) {//break
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

        /* console.log(
        ' | Index: ' + index + 
        ' | Cellindex: ' + cellIndex + 
        '/' + cell +
        ' | LoopStack: ' + loopStack.toString() + 
        ' | Tape: ' + negativeTape.slice().reverse().toString() + ' -|+ ' + positiveTape.toString() + ' |') */

        if (iteration == terminate) {
            returnVar += "Terminated for taking over " + terminate + " iterations! \n"
            break        
        }
    }

    var memoryDump = ""
            negativeTape.slice().reverse().concat(positiveTape).forEach(char => {
                memoryDump += String.fromCharCode(char)  
            });

    returnVar += 'Output: ' + output +
            '\n Tape: ' + negativeTape.reverse().toString() + ' -|+ ' + positiveTape.toString() +
            '\n Dump: ' + memoryDump
    return returnVar
}