const h = require('./helpers')
const d = require('./dataTypes')

var userList = [new d.User(new d.Message(""))]

module.exports.remember = function(message) {
    for (i = 0; i < userList.length; i++) {
        if (userList[i].name == message.from.username) {
            
            if (h.substringMatchCase(message.text, "last", false)) {
                return "Your last message to me was \n\"" +  userList[i].getLastMessage().text + "\""
            }

            if (h.substringMatchCase(message.text, "all", false)) {
                return "These are all the good times I remember with you: \n\"" +  userList[i].getAllMessages()
            }

            return "I remember you, we met " + userList[i].dateMet.toString()
        }
    }
    
    if (userList.length >= 100) {
        userList.shift()
    }
    
    userList.push(new d.User(message))
    return "I don't remmeber you, I will now, at least until I restart"
}

module.exports.forget = function (message) {
    for (i = 0; i < userList.length; i++) {
        if (userList[i].name == message.from.username) {
            userList.splice(i, 1)
            return "I have ripped you from my circuits"
        }
    }
    return "I can't seem to remember knowing you"
}

module.exports.logIfSaved = function (message) {
    userList.forEach(user => {
        if (user.name == message.from.username) {
            user.logMessage(message)
            return
        }
    });
}