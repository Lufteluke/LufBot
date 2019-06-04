const r = require('./replies')
const b = require('./brainfuck')
const h = require('./helpers')
const p = require('./piglatin')
const c = require('./commands')

const from = "TestBot"
var input = "test"

function changeInput(string) {
    console.log("The input is now '" + string + "'")
    input = string
}

console.log("About: " + r.about(from) + '\n')

changeInput ("*hugs*")
console.log("ACTION: " + r.asteriskAction(input, from))
changeInput ("*hugs lufbot*")
console.log("ACTION: " + r.asteriskAction(input, from))
changeInput ("*hugs bot*")
console.log("ACTION: " + r.asteriskAction(input, from))
changeInput ("*hugs you*")
console.log("ACTION: " + r.asteriskAction(input, from) + '\n')

console.log("BAD: " + r.bad(from))
console.log("GOOD: " + r.good(from) + '\n')

changeInput ('bleep boop bleep')
console.log("BEEP: " + r.beep(input) + '\n')

changeInput ("eat all the spicy swedish meatballs")
console.log("BORK: " + r.bork(input))
changeInput ("")
console.log("BORK: " + r.bork(input) + '\n')

console.log("CONSPIRACY: " + r.conspiracy() + '\n')

console.log("DEFAULT: " + r.default(from) + '\n')

console.log("FACT: " + r.fact() + '\n')

changeInput ("fake")
console.log("FAKE: " + r.fake(input))
changeInput ("gay")
console.log("FAKE: " + r.fake(input))
changeInput ("fake and gay")
console.log("FAKE: " + r.fake(input) + '\n')

console.log("HELP: " + r.help() + '\n')

changeInput ("hello, I love your face")
console.log("OWO: " + r.owo(input) + '\n')

changeInput ("safe")
console.log("YIFF: " + r.yiff(input) + '\n')

//console.log(r.lufReplace(r.navy()))

console.log("NAVY: " + r.navy() + '\n')

//console.log("NAVYBORK:" + r.bork(r.navy()) s+ '\n')
//console.log("NAVYOWO:" + r.owo(r.navy()) + '\n')
//console.log("NAVYOWOBORK:" + r.bork(r.owo(r.navy()) + '\n'))
//console.log("NAVYBORKOWO:" + r.owo(r.bork(r.navy()) + '\n'))

//changeInput ("<-<--<---<----<----->++++>+++>++>+>+>++>+++>++++>+++++") //minustest
//changeInput ("++<>++") //minustest
//changeInput (">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->+++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+.") //fancy hello world, negative index #812
//changeInput ("--<-<<+[+[<+>--->->->-<<<]>]<<--.<++++++.<<-..<<.<+.>>.>>.<<<.+++.>>.>>-.<<<+.") // short hello world !!!! NO WORK UP TO 99 999
//changeInput("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.") //hello world #905
changeInput("+[+.]") //sweep
//changeInput("+[>+] nowrap long") //fill array
//changeInput("+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.") //72byte HW #16570
//changeInput("+[>>>->-[>->----<<<]>>]>.---.>+..+++.>>.<.>>---.<<<.+++.------.<-.>>+.") //70byte HW #28741
//changeInput(">+<<->>>++<<<<--")
//changeInput(",-----.... long nowrap") //sweep
//changeInput("+[,.]") //input test
console.log(b.brainfuck(input))

//console.log('meep:' + b.encode('a'))
//console.log(b.brainfuck(b.encode(b.brainfuck('+[,.]')) + ' long'))
//console.log(b.brainfuck(b.encode("a baÿ") + ' long'))

changeInput("Hi, this is pig latin")
console.log("PIGLATIN: " + p.piglatinEncode(input))

console.log("ECHO:" + r.echoMsg({test: this, now: new Date()}))

//console.log("MATCH: " + h.matchWordWithSymbols("/latin", c.commands))