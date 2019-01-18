const h = require('./helpers')

module.exports.brainfuck = function (program) {
    var tape = [0, 0, 0, 0]
    var negativeTape = []
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

    const terminate = 50000
    const wrapCell = !h.matchWord(program, "nowrap")
    if (wrapCell) program = h.replace(program, "nowrap", "")

    while (program[index] != null) {
        iteration++

        while (searchLoop != 0) {
            if (program[index] == undefined) break

            if (program[index] == '[') {
                searchLoop++
            }

            else if (program[index] == ']') {
                searchLoop--
            }
            index++
        }

        /* console.log(
            '#' + iteration +
            " Program: " + program.slice(0, index).toString() +
            '____' + program[index] +
            '____' + program.slice(index + 1).toString() +
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
                index++
                break
        }

        /* console.log(
        ' | Index: ' + index + 
        ' | Cellindex: ' + cellIndex + 
        '/' + cell +
        ' | LoopStack: ' + loopStack.toString() + 
        ' | Tape: ' + (negativeTape.length >= 1 ? negativeTape.reverse().toString() + ' -|+ ' : "") + positiveTape.toString() + ' |') */

        if (iteration >= terminate) {
            returnVar += "Terminated for taking over " + terminate + " iterations! \n"
            break
        }
    }

    var memoryDump = ""
    negativeTape.slice().reverse().concat(positiveTape).forEach(char => {
        memoryDump += String.fromCharCode(char)
    });

    returnVar += 'Output: ' + output +
        '\n Tape: ' + (negativeTape.length >= 1 ? negativeTape.reverse().toString() + ' -|+ ' : "") + positiveTape.toString() +
        '\n Dump: ' + memoryDump
    return returnVar
}