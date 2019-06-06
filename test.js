const r = require('./replies')
const b = require('./brainfuck')
const h = require('./helpers')
const p = require('./piglatin')
const c = require('./commands')
const sentenceAnalyser = require('./sentenceAnalyser')

const from = "TestBot"
var input = "test"

var message = {
    "message_id":0000,
    "from":{
        "id":0000000,
        "is_bot":false,
        "first_name":from,
        "username":"TESTBOT",
        "language_code":"en"
    },
    "chat":{
        "id":-000000000,
        "title":"GROUPNAME",
        "type":"group",
        "all_members_are_administrators":false
    },
    "date":0000000000,
    "text":input,
    "entities":[
        {"offset":0,"length":5,"type":"bot_command"}
    ]
}

function change(string) {
    console.log("Input: \n    \"" + string + "\"")
    input = string
    message.text = string
}

function test(comment) {
    comment = comment.toUpperCase()
    console.log(comment + ": \n    \"" + sentenceAnalyser.parse(message) + "\"\n")
}

function direct(comment, target) {
    comment = comment.toUpperCase()
    var a = h.capitaliseFirst(target(message.text)).trim()
    var b = h.capitaliseFirst(sentenceAnalyser.parse(message)).trim()
    console.log("(direct) " + comment + ": \n    \"" + a + ((a==b)? "\"\n":"\"") )
    if (a!=b) h.warn("\n    \"" + b + "\" \n    Not identical to analyser! \n")
}

function expect(comment, expected) {
    comment = comment.toUpperCase()
    var a = h.capitaliseFirst(sentenceAnalyser.parse(message)).trim()
    console.log("(expect) " + comment + ": \n    \"" + a + "\"")
    if (a==expected)h.succ("PASS \n")
    else h.err("FAIL: expected: \"" + expected + "\"\n")
}

function type(comment) {
    console.log("\n______________ " + comment.toUpperCase() + " ______________\n")
}

//______________ COMMANDS ______________
type("Commands")

change("/echo beep")
test("Echo")

change("/about")
test("About")

change ("/help")
test("Help")

change ("/owo what's this? Notices your code")
test("OWO")
expect("OWO", "what's this? notices yooow code")

change ("/eight will you crash?")
test("Eightball")

change ("/music")
test("Music")

change ("/conspiracy")
test("Conspiracy")

change ("/fact")
test("Fact")

change ("/who made lufbot?")
test("Who")

change ("/navy")
test("NAVY")

change("/bork I like to eat Norwegian Swedes")
//change("")
test("Bork")

change ("/norsk I always try to speak Norwegian when I code")
test("Norsk")

//change ("/brainfuck <-<--<---<----<----->++++>+++>++>+>+>++>+++>++++>+++++") //minustest
//change ("/brainfuck ++<>++") //minustest
//change ("/brainfuck >++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->+++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+.") //fancy hello world, negative index #812
//change ("/brainfuck --<-<<+[+[<+>--->->->-<<<]>]<<--.<++++++.<<-..<<.<+.>>.>>.<<<.+++.>>.>>-.<<<+.") // short hello world !!!! NO WORK UP TO 99 999
//change("/brainfuck ++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.") //hello world #905
//change("/brainfuck +[+.]") //sweep
//change("/brainfuck +[>+] nowrap long") //fill array
//change("/brainfuck +[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.") //72byte HW #16570
//change("/brainfuck +[>>>->-[>->----<<<]>>]>.---.>+..+++.>>.<.>>---.<<<.+++.------.<-.>>+.") //70byte HW #28741
//change("/brainfuck >+<<->>>++<<<<--")
//change("/brainfuck ,-----.... long nowrap") //sweep
//change("/brainfuck +[,.]") //input test
//test("BRAINFUCK")

change("/brainfuckencode abca")
//change("/brainfuckencode a baÿ long")
//change("/brainfuckencode " + b.brainfuck('+[,.]') + ' long')
test("Brainfuck encode")
change("/brainfuck " + b.encode("abca"))
//change("/brainfuck " + b.encode("abcaa baÿ long"))
//change("/brainfuck " + b.encode(b.brainfuck('+[,.]') + ' long'))
test("Brainfuck encode decoded")

//change("/latin Hi, this is fancy speech from latin america")
change("/latin Hi, this is fancy speech from latin america novay")
test("Piglatin")
//change("/latindecode " + p.encode("Hi, this is fancy speech from latin america"))
change("/latindecode novay " + p.encode("Hi, this is fancy speech from latin america novay"))
test("Latinpig")

//______________ MUTATE ______________
type("Mutate")
change("/navy norsk")
//direct("NAVYNORSK", r.lufReplace)
test("Navynorsk")

change("/navy owo")
//direct("NAVYOWO", r.owo)
test("Navyowo")

change("/navy bork")
//direct("NAVYBORK", r.bork)
test("Navybork")

change("/navy bork norsk owo")
test("Navyborkowonorsk")


//______________ SPEECH ______________
type("Speech")

change ("*hugs lufbot*")
test("ACTION")
change ("*hugs bot*")
test("ACTION")
change ("*hugs you*")
test("ACTION")

change("good bot")
test("GOOD")
change("bad bot")
test("BAD")

change ('bleep boop bleep')
direct("BLEEP", r.beep)

change ("Hello, Lufbot")
test ("HELLO")

//direct("DEFAULT", r.default)

change("fact me")
//direct("FACT", r.fact)
test("FACT")

//change ("fake")
//change ("gay")
change ("fake and gay")
direct("FAKE", r.fake)

change("hello, I love your face owo")
direct("OWO", r.owo)

change("/yiff safe")
direct("YIFF", r.yiff)

//console.log("MATCH: " + h.matchWordFromListWithSymbols("/latin", c.commands, true))