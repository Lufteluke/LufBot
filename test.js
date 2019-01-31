const r = require('./replies')
const b = require('./brainfuck')
const h = require('./helpers')
const from = "TestBot"
var input = "test"

function changeInput(string) {
    console.log("The input is now '" + string + "'")
    input = string
}

console.log("About: " + r.about(from) + '\n')

console.log("BAD: " + r.bad(from))
console.log("GOOD: " + r.good(from) + '\n')

changeInput ('bleep boop bleep')
console.log("BEEP: " + r.beep(input) + '\n')

console.log("DEFAULT: " + r.default(from) + '\n')

console.log("HELP: " + r.help() + '\n')

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
console.log(b.brainfuck(b.encode("a baÿ") + ' long'))