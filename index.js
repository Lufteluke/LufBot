//Imports
const axios = require('axios')
var express = require('express')
var bodyParser = require('body-parser')
var sentenceAnalyser = require('./sentenceAnalyser')


var app = express()
var port = process.env.PORT || 3000;
const telegramApiKey = process.env.TELEGRAM_API_KEY || 'bot123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const apiUrl = 'https://api.telegram.org/bot' + telegramApiKey



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)



//GET!
app.post('/new-message', function(req, res) {
  const {message} = req.body

  if (!message || !message.text) {
    console.log('Empty msg!')
    return res.end()
  }
 
  var reply = sentenceAnalyser.parse(message)
  postString(reply, message, res)  
})



//POST!
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
    console.log('Error :', err)
    res.end('Error :' + err)
  })
}



//server start
app.listen(port, function() {
  console.log('LufBot listening on port ' + port)
})