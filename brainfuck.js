
module.exports.brainfuck = function (program) {
    var tape = [0, 0, 0, 0]
    var negativeTape = []
    var positiveTape = tape

    var cellIndex = 0
    var cell = cellIndex
    var index = 0
    var iteration = 0

    var loopStack = []

    var output = ""
    var returnVar = ""
    var programDump = ""

    const long = 50000
    const short = 10000
    const terminate = findAndDeleteCommand("long") ? long : short
    const wrapCell = !findAndDeleteCommand("nowrap")

    while (program[index] != null) {
        iteration++

        //logProgram()

        switch (program[index]) {
            case undefined:
                break

            case '>': //pointer right
                cellIndex++
                cell = findRelativeIndex()
                checkTape()
                index++
                break



            case '<': //pointer left
                cellIndex--
                cell = findRelativeIndex()
                checkTape()
                index++
                break



            case '+': //increment memory
                tape[cell]++
                if (wrapCell && tape[cell] == 256) tape[cell] = 0
                index++
                break



            case '-': //decrement memory

                tape[cell]--
                if (wrapCell && tape[cell] == -1) tape[cell] = 255
                index++
                break



            case '.': //output
                output += String.fromCharCode(tape[cell])
                index++
                break;



            case ',': //input
                //TODO
                tape[cell] = 'F'.charCodeAt(0) //TODO add easter
                index++
                break



            case '[': //while
                if (tape[cell] == 0) { //break
                    index = findEndOfLoop()
                }
                else { //add "[" to stack
                    loopStack.push(index)
                    index++
                }

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



            default: //non-brainfuck character
                index++
                break
        }

        //logState()

        if (iteration >= terminate) {
            returnVar += "Terminated for taking over " + terminate + " iterations! \n"
            break
        }
    }

    returnVar += 'Output: ' + output +
        '\n Tape: ' + getFullTapeString() +
        '\n Dump: ' + memoryDump()
    return returnVar









    function checkTape() {
        if (cellIndex >= 0) {
            tape = positiveTape
        }
        else {
            tape = negativeTape
        }
        if (typeof tape[cell] === 'undefined') {
            tape.push(0, 0, 0, 0)
        }
    }

    function findRelativeIndex() {
        if (cellIndex >= 0) {
            return cellIndex
        }
        else {
            return Math.abs(cellIndex) - 1
        }
    }

    function memoryDump() {
        var memoryDump = ""
        negativeTape.slice().reverse().concat(positiveTape).forEach(char => {
            memoryDump += String.fromCharCode(char)
        });
        return memoryDump
    }

    function logProgram() {
        console.log(
            '#' + iteration +
            " Program: " + program.slice(0, index).toString() +
            '____' + program[index] +
            '____' + program.slice(index + 1).toString())
    }

    function logState() {
        console.log(
            ' | Index: ' + index +
            ' | Cell index: ' + cellIndex + '/' + cell +
            " | Cell content: " + tape[cell] +
            ' | LoopStack: ' + loopStack.toString() +
            ' | Tape: ' + getFullTapeString() + ' |')
    }

    function getFullTapeString() {
        return ((negativeTape.length == 0 ? "" :  negativeTape.slice().reverse().toString() + ' -|+ ') + positiveTape.toString()) //TODO highlight current
    }

    function findEndOfLoop() {
        var searchLoop = 1
        var internalIndex = index + 1
        while (searchLoop != 0) {
            if (program[internalIndex] == undefined) break

            if (program[internalIndex] == '[') {
                searchLoop++
            }

            else if (program[internalIndex] == ']') {
                searchLoop--
            }
            internalIndex++
        }
        return internalIndex
    }

    function findAndDeleteCommand (command) {
        var array = program.split(' ')
        for (var i = 0; i < array.length; i++){
            if (array[i] == command) {
                program = program.split(' ' + command).join('')
                return true
            }
        }
        return false
    }
}