var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

var port = process.env.PORT || 3000;
const telegramApiKey = process.env.TELEGRAM_API_KEY || 'bot123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const apiUrl = 'https://api.telegram.org/' + telegramApiKey

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)


const facts = ['Foxyfluffs are dust on the floor', 'You will die alone and afraid.', 'Error warning etc etc']
const conspiracy = [['Jet ', 'Melting ', 'Steel ', 'Beam ', 'Stealing '],     ['fuel ', 'steel ', 'beams '],     ['melt ', 'fuel ', 'steal ', 'beam '],     ['steel ', 'jet ', 'beam ', 'molten '],     ['beams!', 'jets!', 'fuel!', 'steel!']]
const eightball = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good','Very doubtful', 'Go fuck yourself', 'Fuck a duck']
const yesNoWords = ['am', 'are', 'is', 'was', 'were',    'will' + 'would',    'can', 'could',     'shall', 'should',    'do', 'did', 'done', 'does',    'has', 'had', 'have']
const otherQuestions = ['who', 'what', 'when', 'where', 'why', 'which']
app.post('/new-message', function(req, res) {
  
  const {message} = req.body

  if (!message || !message.text) {
    return res.end()
  }

  var reply = analyseText(message)
  postString(reply, message, res)  
})



//CREATE MESSAGE
function analyseText (message) {
  textMessage = message.text.toLowerCase()

  if (msgMatcInOrder(['*', '*'])) {
    return '0w0 ' + textMessage + ' all over ' + message.from.first_name //todo more
  }

  else if (msgMatch('?') && msgMatchAny(yesNoWords)) {
    return pickRandom(eightball)
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
    return 'I love ' + message.from.first_name + '! ...on the inside anyway'
  }

  else if (msgMatch('good bot')) {
    return 'Likewise, ' + message.from.first_name + ' you\'d make an excellent automaton'
  }

  else if (msgMatch('knock knock')) {
    return 'Who\' there?'
  }

  else if (msgMatch('who dares')) {
    return 'It\'s me, the ' + message.to.first_name + '. I dispense wisdom from my mighty wisdom stack'
  }

  else if (msgMatch('wisdom')) {
    return 'Here is my wisdom: If a script is too large for your server, it\'s not yours'
  }

  else if (msgMatch('conspiracy')) {
    return pickRandom(conspiracy[0]) +  pickRandom(conspiracy[1]) + 'can\'t ' + pickRandom(conspiracy[2]) + pickRandom(conspiracy[3]) + pickRandom(conspiracy[4])
  }
  
  else if (msgMatch('fact')){
    return pickRandom(facts)
  }

  //greetings
  else if (msgMatchAny(['hi', 'hello', 'howdy', 'hai', 'hey', 'yo'])){
    return 'Hello, ' + message.from.first_name + ', how are you?'
  }  

  else if (msgMatch('about')) {
    return "LufBot V0.1 at your service. I was made to confuse" 
  }
  //default
  return "Please be autism, I have patience"

  //Textmatching
  function msgMatch (to) {
    return (textMessage.includes(to))
  }

  //Match any of input
  function msgMatchAny (array) {
    var conditionMet = false;
    array.forEach(element => {
      if (msgMatch (element)){
        conditionMet = true
      }
    });
    return (conditionMet || array.length == 0)
  }

  //Match all of the input
  function msgMatchAll (array) {
    array.forEach(element => {
      if (!msgMatch (element)){
        return false
      }
    });
    return true
  }

  //Match in order
  function msgMatcInOrder (array) { 
    var index = -1
    var current = -1
    var conditionMet = true

    array.forEach(element => {
      current = textMessage.indexOf(element, (index + 1))
      if (current == -1){
        conditionMet = false
      }
      index = current
    });
    return conditionMet
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
app.listen(port, function() {
  console.log('LufBot listening on port ' + port)
})