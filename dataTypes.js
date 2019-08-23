//Complex data structures and objects go here

module.exports.User = function (message) {
    this.name = message.from.username
    this.dateMet = new Date()
    this.messages = [message]
}

exports.User.prototype.getLastMessage = function (){
    return this.messages[this.messages.length-2]
}

exports.User.prototype.getFirstMessage = function (){
    return this.messages[0]
}

exports.User.prototype.getAllMessages = function (){
    var out = ""
    this.messages.forEach(msg => {
        out += msg.text + "\n\n"
    });
    return out
}

exports.User.prototype.logMessage = function (message){
    this.messages.push(message)
    if (this.messages.length >= 100) {
        this.messages.shift()
    }
}

module.exports.Message = function (text) {
    this.message_id = 1000
    this.from =  new exports.From()
    this.chat = new exports.Chat()
    this.date = new Date()
    this.text = text

    this.entities = [
        new exports.Entity()
    ]
}

module.exports.From = function () {
    this.id = 1000000
    this.is_bot = false
    this.first_name = "TestBot"
    this.last_name = "McBot"
    this.username = "TESTBOT"
    this.language_code = "en"
}

module.exports.Chat = function () {
    this.id = -100000000
    this.title = "TestGrounds"
    this.type = "group",
    this.all_members_are_administrators = false
}

module.exports.Entity = function () {
    this.offset = 0
    this.length = 5
    this.type = "bot_command"
}