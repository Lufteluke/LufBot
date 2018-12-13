const r = require('./replies')
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

changeInput ('bleep bloop bleep')
console.log("BEEP: " + r.beep(input) + '\n')

changeInput ("eat all the spicy swedish meatballs")
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
console.log("NAVY: " + r.navy() + '\n')

console.log("NAVYBORK:" + r.bork(r.navy()) + '\n')