const h = require('./helpers')
const l = require('./wordLists')

module.exports.asteriskAction = function (clean, from) { //todo get only center
    clean.replace(/\*/, '')
    if (h.matchWord(clean, 'you')){
        return clean + ' back!~*'
      }
      else if (h.matchWordFromList(clean, l.names)) {
        l.names.forEach(name => {
            clean = clean.replace(name, from)
        });
        return clean + '*'
      }
      else {
        return '0w0 ' + clean + ' all over ' + from + '*'
      }
}

module.exports.owo = function (clean){
    return clean.split('l').join('w').split('r').join('w')
}

module.exports.default = function (from) {
    return h.pickRandom(l.iDontUnderstand) + '. Forgive me ' + from
}