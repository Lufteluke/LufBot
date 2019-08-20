/*
Prototype for remembeering interactions beyond single messages, expect big changes here
*/

const h = require('./helpers')
const d = require('./dataTypes')

var userList = [new d.User(new d.Message(""))]
const maxUsers = 100

module.exports.remember = function(message) {
    for (i = 0; i < userList.length; i++) {
        if (userList[i].name == message.from.username) {
            
            if (h.substringMatchCase(message.text, "last", false)) {
                return "Your last message to me was \n\"" +  userList[i].getLastMessage().text + "\""
            }

            if (h.substringMatchAny(message.text, ["all", "every"])) {
                return "These are all the good times I remember with you: \n\"" +  userList[i].getAllMessages()
            }
            return "I remember you, we met " + userList[i].dateMet.toString()
        }
    }
    
    userList.push(new d.User(message))
    if (userList.length >= maxUsers) {
        userList.shift()
    }

    return "I don't remmeber you, I will now, at least until I restart. Use /forget to stop"
}

module.exports.forget = function (message) {
    for (i = 0; i < userList.length; i++) {
        if (userList[i].name == message.from.username) {
            userList.splice(i, 1)
            return "I have ripped you from my circuits"
        }
    }
    return "I can't seem to remember knowing you. I may have restarted since you last told me to remember."
}

module.exports.logIfSaved = function (message) {
    userList.forEach(user => {
        if (user.name == message.from.username) {
            user.logMessage(message)
            return
        }
    });
}