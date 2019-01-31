const l = require('./wordLists')
const h = require('./helpers')
const r = require('./replies')
const c = require('./commands')
const b = require('./brainfuck')

//Finishing touches on string
module.exports.parse = function (message) {
  
  var returnVar = parser(message)
  
  //empty string catch
  if (returnVar.length === 0) {
    returnVar = r.default(message.from.first_name)
  }

  else {
    //borkify
    if (h.matchWordFromList(message.text.toLowerCase(), c.bork)){
      returnVar = r.bork(returnVar.toLowerCase(), 5)
    }

    //owoify
    if (h.matchWordFromList(message.text.toLowerCase(), c.owo)){
      returnVar = r.owo(returnVar.toLowerCase())
    }

    //norskify
    if (h.matchWordFromList(message.text.toLowerCase(), c.lufReplace)){
      returnVar = r.lufReplace(returnVar.toLowerCase())
    }
  }
    
  return h.capitaliseFirst(returnVar)
}

function parser (message) {
  const {first_name} = message.from
  const {text} = message

  var clean = text.toLowerCase()
  const split  = clean.split(' ')
  const commandWithName = split[0].toLowerCase()
  const command = commandWithName.split('@')[0] //because it might be /command@lufbot
  
  if ((command !== null) && h.matchWordFromList(command, c.commands.concat('/yiff'))) {
    clean = clean.replace(commandWithName, '') //we don't want the name
    
    console.log('Command: ' + command)
    
    switch (command) {
      case '/help':
      return r.help();
      
      case '/brainfuck':
      return b.brainfuck(clean);

      case '/encode':
      return b.encode(clean)

      default:
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

    else if (h.msgMatchInOrder(clean, ['chat', 'id'])) {
      return 'Our lovely chat has the ID: ' + message.chat.id
    }
    else {
      return r.default(first_name)
    }
  }




  function noCommand() {
    //QUESTION
    if (h.msgMatch(clean, '?')) {
      return question()
    }

    //ACTION
    if (h.msgMatchInOrder(clean, c.action)) {
      return r.asteriskAction(clean, first_name)
    }

    //BEEP
    if (h.msgMatchAny(clean, c.beep)){
      return r.beep(clean)
    }

    //FAKE/GAY
    if (h.matchWordFromList(clean, c.fake)){
      return r.fake(clean)
    }

    //FACT
    if (h.msgMatchAny(clean, c.fact)){
      return r.fact(first_name)
    }






    if (h.msgMatch(clean, 'who')) {
      if (h.msgMatch(clean, 'there')){
        return 'Ball!'
      }
      else if (h.msgMatch(clean, 'ball')){
        return 'BallIEVE it or not, I’m walking on air!'
      }
    }
  
    else if (h.msgMatch(clean, 'good wisdom')) {
      return 'Thanks, I also know a few knock knock jokes'
    }
  
    else if (h.msgMatch(clean, 'love')) {
      return 'I love ' + first_name + '! ...on the inside anyway'
    }
  
    else if (h.msgMatch(clean, 'good bot')) {
      return 'Likewise, ' + first_name + ' you\'d make an excellent automaton'
    }
  
    else if (h.msgMatch(clean, 'knock knock')) {
      return 'Who\' there?'
    }
  
    else if (h.msgMatch(clean, 'who dares')) {
      return 'It\'s me, the ' + first_name + '. I dispense wisdom from my mighty wisdom stack'
    }
  
    else if (h.msgMatch(clean, 'wisdom')) {
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