const l = require('./wordLists')
var h = require('./helpers')

module.exports.parse = function (message) {

  const text = message.text.toLowerCase().replace('/talk', '')  
  const {first_name} = message.from
  const split  = text.split(' ')

  if (h.msgMatchInOrder(text, ['*', '*'])) {
    if (h.msgMatch(text, 'you')){
      return text + ' back!~'
    }
    else if (h.msgMatchAny(text, l.names)) {
      return text.replace('lufbot', first_name)
    }
    else {
      return '0w0 ' + text + ' all over ' + first_name 
    }
  }

  else if (h.msgMatch(text, '?')) {

    if (h.msgMatchAny(text, l.eightball)) {
      return h.pickRandom(l.eightball)
    }

    else if (h.msgMatch(text, 'who')) {

      return text.replace('/who', h.pickRandom(l.subjects.concat(first_name))).replace('?', '!')
    }

    else if (h.msgMatchInOrder(text, ['chat', 'id'])) {
      return 'Our lovely chat has the ID: ' + message.chat.id
    }
    else {
      return 'I donut understand the question'
    }
  }

  else if (h.msgMatchAny(text, ['owo', '0w0'])) {
    return text.split('l').join('w').split('r').join('w')
  }

  else if (h.msgMatch(text, 'shrug')) {
    return '¯\\_(ツ)_/¯'
  }

  else if (h.msgMatch(text, 'beep')) {
    
    if (h.msgMatch(text, 'beep boop')) {
      return 'boop beep' 
    }
    else if (h.msgMatch(text, 'boop beep')) {
      return 'beep boop' 
    }
    return 'boop' 
  }

  else if (h.msgMatch(text, 'boop')) {
    return 'beep'
  }
  
  else if (h.msgMatch(text, 'navy')) {
    return 'What the fuck did you just fucking say about me, you little bitch? I\'ll have you know I graduated top of my class in the Navy Seals, and I\'ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I\'m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You\'re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that\'s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn\'t, you didn\'t, and now you\'re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You\'re fucking dead, kiddo.'
  }

  else if (h.msgMatch(text, 'fake')) {
    return 'and gay!' 
  }

  else if (h.msgMatch(text, 'who')) {
    if (h.msgMatch(text, 'there')){
      return 'Ball!'
    }
    else if (h.msgMatch(text, 'ball')){
      return 'BallIEVE it or not, I’m walking on air!'
    }
  }

  else if (h.msgMatch(text, 'good wisdom')) {
    return 'Thanks, I also know a few knock knock jokes'
  }

  else if (h.msgMatch(text, 'love')) {
    return 'I love ' + first_name + '! ...on the inside anyway'
  }

  else if (h.msgMatch(text, 'good bot')) {
    return 'Likewise, ' + first_name + ' you\'d make an excellent automaton'
  }

  else if (h.msgMatch(text, 'knock knock')) {
    return 'Who\' there?'
  }

  else if (h.msgMatch(text, 'who dares')) {
    return 'It\'s me, the ' + first_name + '. I dispense wisdom from my mighty wisdom stack'
  }

  else if (h.msgMatch(text, 'wisdom')) {
    return 'Here is my wisdom: If a script is too large for your server, it\'s not yours'
  }

  else if (h.msgMatch(text, 'conspiracy')) {
    return 
      h.pickRandom(l.conspiracy[0]) +  
      h.pickRandom(l.conspiracy[1]) + 'can\'t ' + 
      h.pickRandom(l.conspiracy[2]) + 
      h.pickRandom(l.conspiracy[3]) + 
      h.pickRandom(l.conspiracy[4])
  }
  
  else if (h.msgMatch(text, 'fact')){
    return pickRandom(l.facts)
  }

  //greetings
  else if (h.msgMatchAny(text, l.greetings)){
    return 'Hello, ' + first_name + ', how are you?'
  }  

  else if (h.msgMatch(text, 'about')) {
    return "LufBot V0.1 at your service. I was made to confuse" 
  }

  //default
  return "Please be autism, I have patience"
}