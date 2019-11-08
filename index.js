//This script will start the app, send messages to the analyser and reply back to the user

//Imports
const axios = require('axios')
var express = require('express')
var bodyParser = require('body-parser')
var sentenceAnalyser = require('./sentenceAnalyser')

var app = express()

/*
The port is set by the environment, and won't work on virtual machines (Azure) if you don't do that.
It can be set manually here if you know what you want.
*/
var port = process.env.PORT || 1337

/* The API key is set in the environment, this can be hardcoded here, 
but then it shouldn't be put on an open git repo
*/
const telegramApiKey = process.env.TELEGRAM_API_KEY || '123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const apiUrl = 'https://api.telegram.org/bot' + telegramApiKey


//I'll be honest, I'm not sure how this part works. Hooks up the bodyparser to the app, I guess.
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)


//GET! This is where new messages come from
app.post('/' + telegramApiKey, function(req, res) {
  const {message} = req.body

  if (!message || !message.text) {
    h.warn('Empty msg!')
    return res.end()
  }
 
  var reply = sentenceAnalyser.parse(message)
  postString(reply, message, res)  
})


//POST! This is where messages are sent back to Telegram
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
    res.end('ok')
  })

  .catch(err => {
    h.err('Error: ' + err)
    res.end('Error: ' + err)
  })
}

const h = require('./helpers')

//START!
app.listen(port, function() {
  h.info('LufBot listening on port ' + port)
})