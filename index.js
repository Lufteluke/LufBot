var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
const apiUrl = "https://api.telegram.org/bot788833207:AAHoFcJiwav5bKMuY5SUmYA5XVRfDPIRSdk"

const facts = ['Foxyfluffs are dust on the floor',
  'You will die alone and afraid.',
  'Error warning etc etc']

const conspiracyJet = ['Jet ', 'Melting ', 'Steel ', 'Beam ', 'Stealing ']
const conspiracyFuel = ['fuel ', 'steel ', 'beams ']
//can't
const conspiracyMelt = ['melt ', 'fuel ', 'steal ', 'beam ']
const conspiracySteel = ['steel ', 'jet ', 'beam ', 'molten ']
const conspiracyBeams = ['beams!', 'jets!', 'fuel!', 'steel!']

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.post('/new-message', function(req, res) {
  
  const { message } = req.body

  if (!message || !message.text) {
    return res.end()
  }

  var reply = analyseText(message);
  postString(reply, message, res)  
})



//CREATE MESSAGE
function analyseText (message) {
  textMessage = message.text.toLowerCase();

  if (msgMatch('*')) {
    return '0w0     ${textMessage} the absolute fuck out of (*•.¸${message.from.first_name}¸.•*) right back~~~~~'
  }

  else if (msgMatch('shrug')) {
    return '¯\\_(ツ)_/¯'
  }

  else if (msgMatch('beep')) {
    
    if (msgMatch('beep boop')) {
      return 'boop beep' 
    }
    else if (msgMatch('boop beep')) {
      return 'beep boop' 
    }
    
    return 'boop' 
  }

  else if (msgMatch('boop')) {
    return 'beep'
  }
  
  else if (msgMatch('navy')) {
    return 'What the fuck did you just fucking say about me, you little bitch? I\'ll have you know I graduated top of my class in the Navy Seals, and I\'ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I\'m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You\'re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that\'s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn\'t, you didn\'t, and now you\'re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You\'re fucking dead, kiddo.'
  }

  else if (msgMatch('fake')) {
    return 'and gay!' 
  }

  else if (msgMatch('who')) {
    if (msgMatch('there')){
      return 'Ball!'
    }
    else if (msgMatch('ball')){
      return 'BallIEVE it or not, I’m walking on air!'
    }
  }

  else if (msgMatch('good wisdom')) {
    return 'Thanks, I also know a few knock knock jokes'
  }

  else if (msgMatch('love')) {
    return 'I love ${message.from.first_name} ! ...on the inside anyway'
  }

  else if (msgMatch('good bot')) {
    return 'Likewise, ${message.from.first_name} you\'d make an excellent automaton'
  }

  else if (msgMatch('knock knock')) {
    return 'Who\' there?'
  }

  else if (msgMatch('who dares')) {
    return 'It\'s me, the Bot of Wisdom. I dispense wisdom from my mighty wisdom stack'
  }

  else if (msgMatch('wisdom')) {
    return 'Here is my wisdom: If a script is too large for your server, it\'s not yours'
  }

  else if (msgMatch('conspiracy')) {
    return pickRandom(conspiracyJet) +  pickRandom(conspiracyFuel) + 'can\'t ' + pickRandom(conspiracyMelt) + pickRandom(conspiracySteel) + pickRandom(conspiracyBeams)
  }
  
  else if (msgMatch('fact')){
    return pickRandom(facts)
  }

  //greetings
  else if (msgMatch('hi')  ||
  msgMatch('hello')        ||
  msgMatch('howdy')        ||
  msgMatch('hai')          ||
  msgMatch('hey')          
  ){
    return 'Hello, ' + message.from.first_name + ', how are you?'
  }  

  else if (msgMatch('about')) {
    return "LufBot V0.1 at your service. I was made to confuse" 
  }
  //default
  return "Please be autism, I have patience"

  //Textmatching
  function msgMatch (to) {
    return (textMessage.indexOf(to) >= 0)
  }

  //Ordered textmatching
  function msgMatcInOrder (array) { 
    var index = -1
    var current = -1
    array.forEach(element => {
      current = textMessage.indexOf(element (index + 1))
      if (current == -1){
        return false;
      }
      index = current;
    });

    return (textMessage.contains(to))
  }


  function pickRandom (array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

//POST MESSAGE
function postString (reply, message, res) {
  axios
  .post(
    apiUrl + '/sendMessage',
    {
      chat_id: message.chat.id,
      text: reply
    }
  )

  .then(response => {
    console.log('Message posted')
    res.end('ok')
  })

  .catch(err => {
    console.log('Error :', err)
    res.end('Error :' + err)
  })
}

//server start
app.listen(3000, function() {
  console.log('LufBot listening on 3000!')
})