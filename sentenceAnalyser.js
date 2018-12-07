const l = require('./wordLists')
const h = require('./helpers')
const r = require('./replies')
const c = require('./commands')


module.exports.parse = function (message) {
  const {first_name} = message.from

  const {text} = message
  const rawSplit = text.split(' ')
  var clean = text.toLowerCase()
  const command = clean[0].toLowerCase()
  const split  = clean.split(' ')

  return "Out of order"

  if (h.matchWordFromList(command, c.commands)) {
    clean = clean.replace(command, '')

    switch (command) {
      case '/talk':
        noCommand();
        break;
      
      case '/owo':
        r.owo(clean)
        break;
      
      case '/eight':
        break;
      
      case '/music':
        break;
      
      case '/conspiracy':
        break;
      
      case '/fact':
        break;
      
      case '/help':
        break;
      
      case '/about':
        break;

      default:
        noCommand()
        break;
    }    
  }
  else {
    noCommand();
  }

  function noCommand() {

    if (h.msgMatch(clean, '?')) {
      question()
    }

    if (h.msgMatchInOrder(clean, c.action)) {
      return r.asteriskAction(clean, first_name)
    }

    if (h.matchWordFromList(clean, c.owo)) {
      return r.owo(clean)
    }
  }

  function question() {

    if (h.msgMatchAny(clean, l.yesNoWords)) {
      return h.pickRandom(l.eightball)
    }

    else if (h.msgMatch(clean, '/who')) {
      return clean.replace('/who', h.pickRandom(l.subjects.concat(first_name))).replace('?', '!')
    }

    else if (h.msgMatchInOrder(clean, ['chat', 'id'])) {
      return 'Our lovely chat has the ID: ' + message.chat.id
    }
    else {
      return 'I donut understand the question'
    }
  }

  if (h.msgMatch(clean, 'shrug')) {
    return '¯\\_(ツ)_/¯'
  }

  else if (h.msgMatch(clean, 'beep')) {
    
    if (h.msgMatch(clean, 'beep boop')) {
      return 'boop beep' 
    }
    else if (h.msgMatch(clean, 'boop beep')) {
      return 'beep boop' 
    }
    return 'boop' 
  }

  else if (h.msgMatch(clean, 'boop')) {
    return 'beep'
  }
  
  else if (h.msgMatch(clean, 'navy')) {
    return 'What the fuck did you just fucking say about me, you little bitch? I\'ll have you know I graduated top of my class in the Navy Seals, and I\'ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I\'m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You\'re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that\'s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn\'t, you didn\'t, and now you\'re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You\'re fucking dead, kiddo.'
  }

  else if (h.msgMatch(clean, 'fake')) {
    return 'and gay!' 
  }

  else if (h.msgMatch(clean, 'who')) {
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

  else if (h.msgMatch(clean, 'conspiracy')) {
    return (
      h.pickRandom(l.conspiracy[0]) +  
      h.pickRandom(l.conspiracy[1]) + 'can\'t ' + 
      h.pickRandom(l.conspiracy[2]) + 
      h.pickRandom(l.conspiracy[3]) + 
      h.pickRandom(l.conspiracy[4])
    )
  }
  
  else if (h.msgMatch(clean, 'fact')){
    return pickRandom(l.facts)
  }

  //greetings
  else if (h.matchWordFromList(clean, l.greetings)){
    return 'Hello, ' + first_name + ', how are you?'
  }  

  else if (h.matchWord(clean, 'about')) {
    return "LufBot V0.1 at your service. I was made to confuse" 
  }

  //default
  return h.pickRandom((l.iDontUnderstand) + ', ' + first_name)
}