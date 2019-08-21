/* A playground for testing functionality. 
Please write tests for all new features and leave them in. 
If they take a lot of space or cpu-time, leave them, but commented out
*/

const r = require('./replies')
const b = require('./brainfuck')
const h = require('./helpers')
const p = require('./piglatin')
const c = require('./commands')
const l = require('./wordLists')
const d = require('./dataTypes')
const sentenceAnalyser = require('./sentenceAnalyser')

const from = "TestBot"
var message = new d.Message("test")
var passed = true

//Quality of life function to change the input string
function change(string) {
    console.log("Input: \n    \"" + string + "\"")
    message = new d.Message(string)
}

/*
Has no fail condition, will simply output the text. 
Please use it over console log for formatting reasons.
Text will be purple for easy recognition.
*/
function test(comment) {
    comment = comment.toUpperCase()
    console.log(l.style.txt.magenta + comment + ": \n    \"" + sentenceAnalyser.parse(message) + "\"" + l.style.reset + "\n")
}

/* 
Will directly target a function you supply and compare it to the free text. Good for testing tergeting.
Will trim and make lower case for compare.
Can't be used for things with random elements or fuzzylogic.
*/
function direct(comment, target) {
    comment = comment.toUpperCase()
    var a = target(message.text).trim()
    var b = sentenceAnalyser.parse(message).trim()
    var match = (h.substringMatchCase(a, b, false))
    
    console.log("(direct) " + comment + ": \n    \"" + a + "\"")
    if (!match){
        h.warn("\n    \"" + b + "\" \n    Sentence analyser does not match direct call!")
        passed = false
    } 
    else h.succ("Pass")
    console.log("")//\n
}

/* Will check the response to an input and expect to see the substring you provide against it.
    "Hi how are you" will be match with "how are" as expected and pass
*/
function expect(comment, expected) {
    comment = comment.toUpperCase()
    var a = sentenceAnalyser.parse(message).trim()
    var match = h.substringMatchCase(a, expected, false)

    console.log("(expect) " + comment + ": \n    \"" + a + "\"")
    if (match)h.succ("Pass")
    else {
        h.err("Expected: \"" + expected + "\"")
        passed = false
    } 
    console.log("")//\n
}

//will make a small headline
function type(comment) {
    h.info("\n______________ " + comment.toUpperCase() + " ______________")
    console.log("")
}

passed = true

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
expect("Who", "made me")
change("/who killed mine?")
expect("Who", "yours")
change("/who killed your dog?")
expect("Who", "my")
change("/who killed you?")
expect("Who", "me")
change("/who did you kill?")
expect("Who", "i did")
change("/who can beat you?")
expect("Who", "beat me")
change("/who do you like?")
expect("Who", "i do")
change("/who can I count on?")
expect("Who", "you can")

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

change("/secrets")
expect("Secrets", "/yiff")

change("/shrug")
expect("Shrug", "¯\\_(ツ)_/¯")

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
expect("Action", "hugs")

change ("*hugs bot*")
expect("Action", "hugs")

change ("*hugs you*")
expect("Action", "back")

change("good bot")
expect("Good", "Likewise")

change("bad bot")
expect("Bad", "I'm sorry")

change ('bleep boop bleep')
direct("Bleep", r.beep)

change ("Hello, Lufbot")
expect ("Hello", "testbot, ")

change("fact me")
//direct("FACT", r.fact)
test("Fact")

//change ("fake")
//change ("gay")
change ("fake and gay")
direct("Fake", r.fake)

change("hello, I love your code")
expect("OWO", "love testbot")

change("/forget about it")
expect("Forget", "ripped")
change("/remember me?")
expect("Remember", "I will now")
change("/remember the last message?")
expect("Remember", "/remember me?")
change("/remember all the good times?")
expect("Remember", "/remember me?")



//Always leave at the bottom
if (passed) {
    h.succ("All tests passed!")
}
else {
    h.err("Some tests failed!")
}