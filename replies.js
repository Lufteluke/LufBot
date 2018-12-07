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
    return h.replaceList(['l','r'], 'w', clean)
}

module.exports.default = function (from) {
    return h.pickRandom(l.iDontUnderstand) + '. ' + h.pickRandom(l.doMe) + ' ' + from
}

module.exports.who = function (clean, from ) {
    const replace = h.pickRandom(l.subjects.concat(from))
    if (!h.matchWord('who')) {
        return replace + clean.replace('?', '!')
    }
    else return clean.replace('who', replace).replace('?', '!')
}

module.exports.beep = function (clean) {
    clean = h.replace('beep', 'poop'. clean)
    clean = h.replace('boop', 'beep', clean)
    return h.replace('poop', 'boop', clean)
}

module.exports.beep = function (clean) {
    if (!matchWord(clean, 'fake')){
        return h.replace('gay', 'fake and gay', clean)
    }
    else if (!matchWord(clean, 'gay')) {
        return h.replace('fake', 'fake and gay', clean)
    }
    else return h.replace('pay', 'gay', 
        h.replace('gay', 'fake', 
            h.replace('fake', 'pay', clean)))
}

module.exports.navy = function (){
    return l.navy
}

module.exports.conspiracy = function (){
    return (
      h.pickRandom(l.conspiracy[0]) +  
      h.pickRandom(l.conspiracy[1]) + 'can\'t ' + 
      h.pickRandom(l.conspiracy[2]) + 
      h.pickRandom(l.conspiracy[3]) + 
      h.pickRandom(l.conspiracy[4])
    )
}

module.exports.fact = function (){
    return pickRandom(l.facts)
}