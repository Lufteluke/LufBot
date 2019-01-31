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

  return h.capitaliseFirst(returnVar)
}

function parser (message) {
  const {first_name} = message.from
  const {text} = message

  var clean = text //text.toLowerCase()
  const split  = clean.split(' ')
  const commandWithName = split[0].toLowerCase()
  const command = commandWithName.split('@')[0] //because it might be /command@lufbot
  
  if ((command !== null) && h.matchWordFromList(command, c.commands)) {
    clean = clean.replace(commandWithName, '') //we don't want the name
    
    console.log('Command: ' + command)
    
    switch (command) {
      case '/help':
      return r.help();
      
      case '/about':
      return r.about(first_name);

      case '/decode':
      return b.brainfuck(clean);

      case '/encode':
      return b.encode(clean)

      case '/echo':
      return r.echoMsg(message)

      default:
      return "I don't know the command: " + command + ", but I should";
    }
  }
  else {
    return noCommand();
  }

  function noCommand() {
    //QUESTION
    if (h.msgMatch(clean, '?')) {
      return question()
    }

    //BEEP
    if (h.msgMatchAny(clean, c.beep)){
      return r.beep(clean)
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