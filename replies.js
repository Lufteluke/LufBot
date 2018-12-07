const h = require('./helpers')

module.exports.asteriskAction = function (clean, from) { //todo get only center
    clean.replace(/\*/)
    if (h.msgMatch(clean, 'you')){
        return clean + ' back!~*'
      }
      else if (h.msgMatchAny(clean, l.names)) {
        return clean.replace('lufbot', from) + '*'
      }
      else {
        return '0w0 ' + clean + ' all over ' + from + '*'
      }
}

module.exports.owo = function (clean){
    return clean.split('l').join('w').split('r').join('w')
}