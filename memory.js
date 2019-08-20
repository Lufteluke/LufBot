/*
Prototype for remembeering interactions beyond single messages, expect big changes here
*/

const h = require('./helpers')
const d = require('./dataTypes')

var userList = [new d.User(new d.Message(""))]
const maxUsers = 100

module.exports.remember = function(message) {
    var user = message.from.username
    var firstName = message.from.first_name
    var out = ""
    for (i = 0; i < userList.length; i++) {
        if (userList[i].name == user) {
            if (h.substringMatchCase(message.text, "?", false)) out += "Yes! "

            if (h.substringMatchCase(message.text, "last", false)) {
                return out + "Hi, " + firstName + "! Your last message to me was \n\"" +  userList[i].getLastMessage().text + "\""
            }

            else if (h.substringMatchAny(message.text, ["all", "every"])) {
                return out + "These are all the good times I remember with you, " + firstName + ": \n\"" +  userList[i].getAllMessages()
            }
            return out + "Of course I remember you, " + firstName + ". We met " + userList[i].dateMet.toString()
        }
    }
    
    userList.push(new d.User(message))
    if (userList.length >= maxUsers) {
        userList.shift()
    }
    
    if (h.substringMatchCase(message.text, "?", false)) out += "No, "
    return out + "I don't remmeber you, " + firstName + ". I will now, at least until I restart. Use /forget to stop"
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