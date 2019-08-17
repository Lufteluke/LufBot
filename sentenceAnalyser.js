/*
Takes the message and strips various parts down. 
It detects if any of the command are present and triggers on certain strings. 
Depending on the command or text recognised, it may forward the message to replies 
or directly to the more complex scripts. 
It returns the result back to index which sends it to the user.
*/

const l = require('./wordLists')
const h = require('./helpers')
const r = require('./replies')
const c = require('./commands')
const b = require('./brainfuck')
const p = require('./piglatin')
const m = require('./memory')

//Finishing touches on string
module.exports.parse = function (message) {
  
  // this is basically the whole reply
  var returnVar = parser(message)
  
  //empty string catch
  if (returnVar.length === 0) {
    returnVar = r.default(message.from.first_name)
  }

  else {
    //borkify
    if (h.matchWordFromList(message.text, c.bork)){
      returnVar = r.bork(returnVar.toLowerCase(), 5)
    }

    //owoify
    if (h.matchWordFromList(message.text, c.owo)){
      returnVar = r.owo(returnVar.toLowerCase())
    }

    //norskify
    if (h.matchWordFromList(message.text, c.lufReplace)){
      returnVar = r.lufReplace(returnVar.toLowerCase())
    }
  }
    
  return h.capitaliseFirst(returnVar)
}

//parse message to find which reply function to use
function parser (message) {
  const {first_name} = message.from
  const {text} = message

  var clean = text.toLowerCase()
  const split  = clean.split(' ')
  const commandWithName = split[0]
  const command = commandWithName.split('@')[0] //because it might be /command@lufbot

  m.logIfSaved(message)
  
  //if command is in list
  if ((command !== null) && h.matchWordFromListWithSymbols(command, c.commands.concat(c.secretCommands), true)) {
    clean = clean.replace(commandWithName, '') //we don't want the name
    
    //find actual command
    console.log('Command: ' + command)
    
    switch (command) {
      case '/talk':
      return noCommand();
      
      case '/owo':
      return r.owo(clean);
      
      case '/eight':
      return h.pickRandom(l.eightball);
      
      case '/music':
      return 'I don\'t know music yet';
      
      case '/conspiracy':
      return r.conspiracy();
      
      case '/fact':
      return r.fact(first_name);
      
      case '/help':
      return r.help();
      
      case '/about':
      return r.about(first_name);

      case '/who':
      return r.who(clean, first_name);

      case '/navy':
      return r.navy();

      case '/yiff':
      return r.yiff(clean);

      case '/bork':
      return r.bork(clean, 5);

      case '/norsk':
      return r.lufReplace(clean);

      case '/brainfuck':
      return b.brainfuck(clean);

      case '/brainfuckencode':
      return b.encode(clean)

      case '/echo':
      return r.echoMsg(message)

      case '/latin':
      return p.encode(clean)

      case '/latindecode':
      return p.decode(clean)

      case '/remember':
      return m.remember(message)

      case '/forget':
      return m.forget(message)

      default:
      h.err("Command unknown: " + command)
      return "I don't know the command: " + command + ", but I should";
    }
  }
  else {
    return noCommand();
  }




  //QUESTION
  function question() {

    if (h.matchWordFromList(clean, l.yesNoWords)) {
      return h.pickRandom(l.eightball)
    }

    else if (h.matchWord(clean, 'who')) {
      return r.who(clean, first_name);
    }

    else if (h.substringMatchInOrder(clean, ['chat', 'id'])) {
      return 'Our lovely chat has the ID: ' + message.chat.id
    }
    else {
      return r.default(first_name)
    }
  }




  function noCommand() {
    //QUESTION
    if (h.substringMatch(clean, '?')) {
      return question()
    }

    //ACTION
    if (h.substringMatchInOrder(clean, c.action)) {
      return r.asteriskAction(clean, first_name)
    }

    //BEEP
    if (h.substringMatchAny(clean, c.beep)){
      return r.beep(clean)
    }

    //FAKE/GAY
    if (h.matchWordFromList(clean, c.fake)){
      return r.fake(clean)
    }

    //FACT
    if (h.substringMatchAny(clean, c.fact)){
      return r.fact(first_name)
    }






    if (h.substringMatch(clean, 'who')) {
      if (h.substringMatch(clean, 'there')){
        return 'Ball!'
      }
      else if (h.substringMatch(clean, 'ball')){
        return 'BallIEVE it or not, I’m walking on air!'
      }
    }
  
    else if (h.substringMatch(clean, 'good wisdom')) {
      return 'Thanks, I also know a few knock knock jokes'
    }
  
    else if (h.substringMatch(clean, 'love')) {
      return 'I love ' + first_name + '! ...on the inside anyway'
    }
  
    else if (h.substringMatch(clean, 'good bot')) {
      return 'Likewise, ' + first_name + ' you\'d make an excellent automaton'
    }
  
    else if (h.substringMatch(clean, 'knock knock')) {
      return 'Who\' there?'
    }
  
    else if (h.substringMatch(clean, 'who dares')) {
      return 'It\'s me, the ' + first_name + '. I dispense wisdom from my mighty wisdom stack'
    }
  
    else if (h.substringMatch(clean, 'wisdom')) {
      return 'Here is my wisdom: If a script is too large for your server, it\'s not yours'
    }

    //good
    else if (h.matchWordFromList(clean, l.positive)){
      return r.good(first_name)
    }

    //bad
    else if (h.matchWordFromList(clean, l.negative)){
      return r.bad(first_name)
    }
  
    //greetings
    else if (h.matchWordFromList(clean, l.greetings)){
      return 'Hello, ' + first_name + ', how are you?'
    }  

    //default
    return r.default(first_name)
  }
}