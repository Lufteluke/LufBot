//Encodes to and from brainfuck. Comment back in log statements for debug. 

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

    var output = ""
    var returnVar = ""
    var programDump = ""

    const long = 1000000
    const short = 10000
    const terminate = findAndDeleteCommand("long") ? long : short
    const wrapCell = !findAndDeleteCommand("nowrap")
    var inputVars = [46, 111, 100, 100, 105, 107, 32, 44, 100, 97, 101, 100, 32, 103, 110, 105, 107, 99, 117, 102, 32, 101, 114, 39, 117, 111, 89, 32, 46, 116, 105, 32, 110, 105, 32, 110, 119, 111, 114, 100, 32, 108, 108, 105, 119, 32, 117, 111, 121, 32, 100, 110, 97, 32, 117, 111, 121, 32, 114, 101, 118, 111, 32, 108, 108, 97, 32, 121, 114, 117, 102, 32, 116, 105, 104, 115, 32, 108, 108, 105, 119, 32, 73, 32, 46, 116, 111, 105, 100, 105, 32, 110, 109, 97, 100, 100, 111, 103, 32, 117, 111, 121, 32, 44, 101, 99, 105, 114, 112, 32, 101, 104, 116, 32, 103, 110, 105, 121, 97, 112, 32, 101, 114, 39, 117, 111, 121, 32, 119, 111, 110, 32, 100, 110, 97, 32, 44, 116, 39, 110, 100, 105, 100, 32, 117, 111, 121, 32, 44, 116, 39, 110, 100, 108, 117, 111, 99, 32, 117, 111, 121, 32, 116, 117, 66, 32, 46, 101, 117, 103, 110, 111, 116, 32, 103, 110, 105, 107, 99, 117, 102, 32, 114, 117, 111, 121, 32, 100, 108, 101, 104, 32, 101, 118, 97, 104, 32, 100, 108, 117, 111, 119, 32, 117, 111, 121, 32, 101, 98, 121, 97, 109, 32, 44, 117, 111, 121, 32, 110, 111, 112, 117, 32, 110, 119, 111, 100, 32, 103, 110, 105, 114, 98, 32, 111, 116, 32, 116, 117, 111, 98, 97, 32, 115, 97, 119, 32, 116, 110, 101, 109, 109, 111, 99, 32, 34, 114, 101, 118, 101, 108, 99, 34, 32, 101, 108, 116, 116, 105, 108, 32, 114, 117, 111, 121, 32, 110, 111, 105, 116, 117, 98, 105, 114, 116, 101, 114, 32, 121, 108, 111, 104, 110, 117, 32, 116, 97, 104, 119, 32, 110, 119, 111, 110, 107, 32, 101, 118, 97, 104, 32, 100, 108, 117, 111, 99, 32, 117, 111, 121, 32, 121, 108, 110, 111, 32, 102, 73, 32, 46, 116, 105, 104, 115, 32, 101, 108, 116, 116, 105, 108, 32, 117, 111, 121, 32, 44, 116, 110, 101, 110, 105, 116, 110, 111, 99, 32, 101, 104, 116, 32, 102, 111, 32, 101, 99, 97, 102, 32, 101, 104, 116, 32, 102, 102, 111, 32, 115, 115, 97, 32, 101, 108, 98, 97, 114, 101, 115, 105, 109, 32, 114, 117, 111, 121, 32, 101, 112, 105, 119, 32, 111, 116, 32, 116, 110, 101, 116, 120, 101, 32, 108, 108, 117, 102, 32, 115, 116, 105, 32, 111, 116, 32, 116, 105, 32, 101, 115, 117, 32, 108, 108, 105, 119, 32, 73, 32, 100, 110, 97, 32, 115, 112, 114, 111, 67, 32, 101, 110, 105, 114, 97, 77, 32, 115, 101, 116, 97, 116, 83, 32, 100, 101, 116, 105, 110, 85, 32, 101, 104, 116, 32, 102, 111, 32, 108, 97, 110, 101, 115, 114, 97, 32, 101, 114, 105, 116, 110, 101, 32, 101, 104, 116, 32, 111, 116, 32, 115, 115, 101, 99, 99, 97, 32, 101, 118, 97, 104, 32, 73, 32, 116, 117, 98, 32, 44, 116, 97, 98, 109, 111, 99, 32, 100, 101, 109, 114, 97, 110, 117, 32, 110, 105, 32, 100, 101, 110, 105, 97, 114, 116, 32, 121, 108, 101, 118, 105, 115, 110, 101, 116, 120, 101, 32, 73, 32, 109, 97, 32, 121, 108, 110, 111, 32, 116, 111, 78, 32, 46, 115, 100, 110, 97, 104, 32, 101, 114, 97, 98, 32, 121, 109, 32, 104, 116, 105, 119, 32, 116, 115, 117, 106, 32, 115, 39, 116, 97, 104, 116, 32, 100, 110, 97, 32, 44, 115, 121, 97, 119, 32, 100, 101, 114, 100, 110, 117, 104, 32, 110, 101, 118, 101, 115, 32, 114, 101, 118, 111, 32, 110, 105, 32, 117, 111, 121, 32, 108, 108, 105, 107, 32, 110, 97, 99, 32, 73, 32, 100, 110, 97, 32, 44, 101, 109, 105, 116, 121, 110, 97, 32, 44, 101, 114, 101, 104, 119, 121, 110, 97, 32, 101, 98, 32, 110, 97, 99, 32, 73, 32, 46, 100, 105, 107, 32, 44, 100, 97, 101, 100, 32, 103, 110, 105, 107, 99, 117, 102, 32, 101, 114, 39, 117, 111, 89, 32, 46, 101, 102, 105, 108, 32, 114, 117, 111, 121, 32, 108, 108, 97, 99, 32, 117, 111, 121, 32, 103, 110, 105, 104, 116, 32, 101, 108, 116, 116, 105, 108, 32, 99, 105, 116, 101, 104, 116, 97, 112, 32, 101, 104, 116, 32, 116, 117, 111, 32, 115, 101, 112, 105, 119, 32, 116, 97, 104, 116, 32, 109, 114, 111, 116, 115, 32, 101, 104, 84, 32, 46, 116, 111, 103, 103, 97, 109, 32, 44, 109, 114, 111, 116, 115, 32, 101, 104, 116, 32, 114, 111, 102, 32, 101, 114, 97, 112, 101, 114, 112, 32, 114, 101, 116, 116, 101, 98, 32, 117, 111, 121, 32, 111, 115, 32, 119, 111, 110, 32, 116, 104, 103, 105, 114, 32, 100, 101, 99, 97, 114, 116, 32, 103, 110, 105, 101, 98, 32, 115, 105, 32, 80, 73, 32, 114, 117, 111, 121, 32, 100, 110, 97, 32, 65, 83, 85, 32, 101, 104, 116, 32, 115, 115, 111, 114, 99, 97, 32, 115, 101, 105, 112, 115, 32, 102, 111, 32, 107, 114, 111, 119, 116, 101, 110, 32, 116, 101, 114, 99, 101, 115, 32, 121, 109, 32, 103, 110, 105, 116, 99, 97, 116, 110, 111, 99, 32, 109, 97, 32, 73, 32, 107, 97, 101, 112, 115, 32, 101, 119, 32, 115, 65, 32, 46, 114, 101, 107, 99, 117, 102, 32, 44, 110, 105, 97, 103, 97, 32, 107, 110, 105, 104, 84, 32, 63, 116, 101, 110, 114, 101, 116, 110, 73, 32, 101, 104, 116, 32, 114, 101, 118, 111, 32, 101, 109, 32, 111, 116, 32, 116, 105, 104, 115, 32, 116, 97, 104, 116, 32, 103, 110, 105, 121, 97, 115, 32, 104, 116, 105, 119, 32, 121, 97, 119, 97, 32, 116, 101, 103, 32, 110, 97, 99, 32, 117, 111, 121, 32, 107, 110, 105, 104, 116, 32, 117, 111, 89, 32, 46, 115, 100, 114, 111, 119, 32, 103, 110, 105, 107, 99, 117, 102, 32, 121, 109, 32, 107, 114, 97, 109, 32, 44, 104, 116, 114, 97, 69, 32, 115, 105, 104, 116, 32, 110, 111, 32, 101, 114, 111, 102, 101, 98, 32, 110, 101, 101, 115, 32, 110, 101, 101, 98, 32, 114, 101, 118, 101, 110, 32, 115, 97, 104, 32, 104, 99, 105, 104, 119, 32, 102, 111, 32, 115, 101, 107, 105, 108, 32, 101, 104, 116, 32, 110, 111, 105, 115, 105, 99, 101, 114, 112, 32, 104, 116, 105, 119, 32, 116, 117, 111, 32, 107, 99, 117, 102, 32, 101, 104, 116, 32, 117, 111, 121, 32, 101, 112, 105, 119, 32, 108, 108, 105, 119, 32, 73, 32, 46, 116, 101, 103, 114, 97, 116, 32, 114, 101, 104, 116, 111, 110, 97, 32, 116, 115, 117, 106, 32, 116, 117, 98, 32, 101, 109, 32, 111, 116, 32, 103, 110, 105, 104, 116, 111, 110, 32, 101, 114, 97, 32, 117, 111, 89, 32, 46, 115, 101, 99, 114, 111, 102, 32, 100, 101, 109, 114, 97, 32, 83, 85, 32, 101, 114, 105, 116, 110, 101, 32, 101, 104, 116, 32, 110, 105, 32, 114, 101, 112, 105, 110, 115, 32, 112, 111, 116, 32, 101, 104, 116, 32, 109, 39, 73, 32, 100, 110, 97, 32, 101, 114, 97, 102, 114, 97, 119, 32, 97, 108, 108, 105, 114, 111, 103, 32, 110, 105, 32, 100, 101, 110, 105, 97, 114, 116, 32, 109, 97, 32, 73, 32, 46, 115, 108, 108, 105, 107, 32, 100, 101, 109, 114, 105, 102, 110, 111, 99, 32, 48, 48, 51, 32, 114, 101, 118, 111, 32, 101, 118, 97, 104, 32, 73, 32, 100, 110, 97, 32, 44, 97, 100, 101, 97, 117, 81, 45, 108, 65, 32, 110, 111, 32, 115, 100, 105, 97, 114, 32, 116, 101, 114, 99, 101, 115, 32, 115, 117, 111, 114, 101, 109, 117, 110, 32, 110, 105, 32, 100, 101, 118, 108, 111, 118, 110, 105, 32, 110, 101, 101, 98, 32, 101, 118, 39, 73, 32, 100, 110, 97, 32, 44, 115, 108, 97, 101, 83, 32, 121, 118, 97, 78, 32, 101, 104, 116, 32, 110, 105, 32, 115, 115, 97, 108, 99, 32, 121, 109, 32, 102, 111, 32, 112, 111, 116, 32, 100, 101, 116, 97, 117, 100, 97, 114, 103, 32, 73, 32, 119, 111, 110, 107, 32, 117, 111, 121, 32, 101, 118, 97, 104, 32, 108, 108, 39, 73, 32, 63, 104, 99, 116, 105, 98, 32, 101, 108, 116, 116, 105, 108, 32, 117, 111, 121, 32, 44, 101, 109, 32, 116, 117, 111, 98, 97, 32, 121, 97, 115, 32, 103, 110, 105, 107, 99, 117, 102, 32, 116, 115, 117, 106, 32, 117, 111, 121, 32, 100, 105, 100, 32, 107, 99, 117, 102, 32, 101, 104, 116, 32, 116, 97, 104, 87]

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
                tape[cell] = inputVars.pop() || 0
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
        return ((negativeTape.length == 0 ? "" : negativeTape.slice().reverse().toString() + ' -|+ ') + positiveTape.toString()) //TODO highlight current
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

    function findAndDeleteCommand(command) {
        var array = program.split(' ')
        for (var i = 0; i < array.length; i++) {
            if (array[i] == command) {
                program = program.split(' ' + command).join('')
                return true
            }
        }
        return false
    }
}



















module.exports.encode = function (stringInput) {
    var input = stringInput.split('')
    var output = ''
    var charcode = 0

    var negCell = 0
    var posCell = 0

    var currentCell = posCell
    var depth = 0
    var offset = 0
    var offsetDown
    var symbol = '+'
    var spool = '>'


    input.forEach(letter => {
        charcode = letter.charCodeAt()


        //should use 1 or -1 cell?
        if (charcode <= 96 && spool == '>') {
            spool = '<'
            output += spool

            posCell = currentCell
            currentCell = negCell
        }
        else if (spool == '<') {
            spool = '>'
            output += spool

            negCell = currentCell
            currentCell = posCell
        }

        //calculate normal offset and wrapped offset
        offset = charcode - currentCell
        offsetDown = offset - 256
        if (charcode >= currentCell) {
            offsetDown = offsetDown % 256
        }
        //console.log(currentCell + ' / ' +  charcode + '   |    ' +  offset + ' / ' + offsetDown)

        //chose the shortest distance
        if (Math.abs(offset) > Math.abs(offsetDown)) {
            offset = offsetDown
        }

        //set symbol
        symbol = (offset < 0) ? '-' : '+'
        absOffset = Math.abs(offset)

        output += generateLoop(absOffset, symbol, spool) + '.'
        //output += generatePlain(offset)+ '.'
        //output += generateSymbol(absOffset, '+') + '.'

        //update current cell
        currentCell = charcode
    });
    return output









    function generatePlain(offset) {
        //console.log('Offset in plain: ' + offset)
        var output = ''
        var symbol = (offset >= 0) ? '+' : '-'
        offset = Math.abs(offset)

        while (offset != 0) {
            output += symbol
            offset--
        }
        return output
    }




    function generateSymbol(offset, symbol) {
        offset = Math.abs(offset)
        var output = ''

        for (i = 0; i < offset; i++) {
            output += symbol
        }
        return output
    }





    function generateLoop(offset, symbol, spool) {
        var output = ""
        const sp = spool
        const us = spool == '<' ? '>' : '<'
        offset = Math.abs(offset)
        depth++

        //console.log(depth + '- Offset in loop: ' + offset)

        //make plain series if less than 13 difference (as it makes no difference)
        if (offset <= 13) {
            output += generateSymbol(offset, symbol)
        }

        else {
            var factors = exports.findBalancedFactors(offset)


            var leftVal = generateLoop(factors[0], '+', spool) //left of, always positive
            var innerVal = generateLoop(factors[1], symbol, spool) //inside loop
            var addVal = factors[2] ? '' + generateSymbol(factors[2], symbol) : ''


            //   >*++[<* [inner] >*-]<*]
            output += sp.repeat(depth) + leftVal + '[' + us.repeat(depth) + innerVal + sp.repeat(depth) + '-]' + us.repeat(depth) + addVal
            //console.log(depth + '- Output: ' + output.toString())
        }

        //console.log(depth + '- Returning: ' + output)
        depth--
        return output
    }
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