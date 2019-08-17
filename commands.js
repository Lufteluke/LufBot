//If you want to add a trigger or command, this is the place

//The main commands, will be listed with /help
module.exports.commands = ['/talk', '/owo', '/eight', '/music', '/conspiracy', '/fact', '/help', '/about', 
'/who', '/navy', '/bork', '/norsk', '/brainfuck', '/brainfuckencode', '/echo', '/latin', '/latindecode', '/remember', '/forget']

//Won't be shown with /help
module.exports.secretCommands = ['/yiff']



//INLINE
module.exports.action = ['*', '*']

module.exports.beep = ['beep', 'boop', 'bleep', 'bloop']

module.exports.fake = ['fake', 'gay']

module.exports.fact = ['fact']



//MODIFIERS
module.exports.owo = ['owo', '0w0']

module.exports.bork = ['bork']

module.exports.lufReplace = ['norsk']

module.exports.modifiers = exports.owo.concat(exports.bork, exports.lufReplace)