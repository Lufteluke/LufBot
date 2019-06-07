const r = require('./replies')
const b = require('./brainfuck')
const h = require('./helpers')
const p = require('./piglatin')
const c = require('./commands')
const l = require('./wordLists')
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
    console.log(l.style.txt.magenta + comment + ": \n    \"" + sentenceAnalyser.parse(message) + "\"" + l.style.reset + "\n")
}

function direct(comment, target) {
    comment = comment.toUpperCase()
    var a = target(message.text).trim()
    var b = sentenceAnalyser.parse(message).trim()
    var match = (h.substringMatchCase(a, b, false))
    
    console.log("(direct) " + comment + ": \n    \"" + a + "\"")
    if (!match) h.warn("\n    \"" + b + "\" \n    Sentence analyser does not match direct call!")
    else h.succ("Pass")
    console.log("")//\n
}

function expect(comment, expected) {
    comment = comment.toUpperCase()
    var a = sentenceAnalyser.parse(message).trim()
    var match = h.substringMatchCase(a, expected, false)

    console.log("(expect) " + comment + ": \n    \"" + a + "\"")
    if (match)h.succ("Pass")
    else h.err("Expected: \"" + expected + "\"")
    console.log("")//\n
}

function type(comment) {
    h.info("\n______________ " + comment.toUpperCase() + " ______________")
    console.log("")
}

//______________ COMMANDS ______________
type("Commands")

change("/echo beep")
expect("Echo", JSON.stringify(message))

change("/about")
expect("About", "LufBot V0.1 at your service")

change ("/help")
expect("Help", "/conspiracy")

change ("/owo what's this? Notices your code")
expect("OWO", "notices yooow code")

change ("/eight will you crash?")
test("Eightball")

change ("/music")
test("Music")

change ("/conspiracy")
test("Conspiracy")

change ("/fact")
test("Fact")

change ("/who made lufbot?")
expect("Who", "made lufbot")

change ("/navy")
expect("NAVY", "what the fuck")

change("/bork I like to eat Norwegian Swedes")
test("Bork")

change ("/norsk I always try to speak Norwegian when I code")
expect("Norsk", "norweqian")



//change("/brainfuckencode a baÿ long")
//change("/brainfuckencode " + b.brainfuck('+[,.]') + ' long')
change("/brainfuckencode abca")
expect("Brainfuck encode", "<<+++++[>++++++<-]>++.>>++++++++[<++++++++++++>-]<+.+.+.--.")

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
//change("/brainfuck " + b.encode("abcaa baÿ long"))
//change("/brainfuck " + b.encode(b.brainfuck('+[,.]') + ' long'))
change("/brainfuck " + b.encode("abca"))
expect("Brainfuck encode decoded", "abca")



change("/latin Hi, this is fancy speech from latin america")
expect("Latinpig", "americavay")
change("/latin Hi, this is fancy speech from latin america novay")
expect("Piglatin novay", "americaay")

change("/latindecode " + p.encode("Hi, this is fancy speech from latin america"))
expect("Latinpig", "america")
change("/latindecode novay " + p.encode("Hi, this is fancy speech from latin america novay"))
expect("Latinpig novay", "america")

change("/yiff in hell")
expect("YIFF", "/yiff@e621bot")

//______________ MUTATE ______________
type("Mutate")
change("/navy norsk")
//direct("NAVYNORSK", r.lufReplace)
expect("Navynorsk", "dyr")

change("/navy owo")
//direct("NAVYOWO", r.owo)
expect("Navyowo", "gowiwwa wawfawe")

change("/navy bork")
//direct("NAVYBORK", r.bork)
expect("Navybork", "zee")

change("/navy bork norsk owo")
expect("Navyborkowonorsk", "yoooo")


//______________ SPEECH ______________
type("Speech")

change ("*hugs lufbot*")
expect("ACTION", "hugs")

change ("*hugs bot*")
expect("ACTION", "hugs")

change ("*hugs you*")
expect("ACTION", "back")

change("good bot")
expect("GOOD", "Likewise")

change("bad bot")
expect("BAD", "I'm sorry")

change ('bleep boop bleep')
direct("BLEEP", r.beep)

change ("Hello, Lufbot")
expect ("HELLO", "testbot, ")

change("fact me")
//direct("FACT", r.fact)
test("FACT")

//change ("fake")
//change ("gay")
change ("fake and gay")
direct("FAKE", r.fake)

change("hello, I love your code")
expect("OWO", "love testbot")