const l = require('./wordLists')
const h = require('./helpers')
const c = require('./commands')

module.exports.asteriskAction = function (clean, from) { //todo get only center
    clean = h.replace(clean, '*', '')
    if (h.matchWord(clean, 'you')){
        return '*' + clean + ' back!~*'
      }
    else if (h.matchWordFromList(clean, l.names)) {
        l.names.forEach(name => {
            clean = clean.replace(name, from)
            return '*' + clean + '*'
        });
    }
    else {
        return '0w0 *' + clean + ' all over ' + from + '*'
    }
    return '*Confused*'
}

module.exports.owo = function (clean){
    return h.replace(h.replaceList(clean, ['l','r'], 'w'), 'u', 'oo')
}

module.exports.default = function (from) {
    return h.pickRandom(l.iDontUnderstand) + '. ' + h.pickRandom(l.doMe) + ', ' + from
}

module.exports.who = function (clean, from ) {
    const doer = h.pickRandom(l.subjects.concat(from))
    if (!h.matchWord('who')) {
        return doer + clean.replace('?', '!')
    }
    else return clean.replace('who', doer).replace('?', '!')
}

module.exports.beep = function (clean) {
    clean = h.replace(clean, 'beep', 'ᛟ')
    clean = h.replace(clean, 'boop', 'beep')
    return h.replace(clean, 'ᛟ', 'boop')
}

module.exports.fake = function (clean) {
    if (!h.matchWord(clean, 'fake')){
        return h.replace(clean, 'gay', 'fake and gay')
    }
    else if (!h.matchWord(clean, 'gay')) {
        return h.replace(clean, 'fake', 'fake and gay')
    }
    else return h.replace(h.replace(h.replace(clean, 'fake', 'ᛟ'), 'gay', 'fake'), 'ᛟ', 'gay')
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
    return exports.randomFact()
    //return h.pickRandom(l.facts)
}

module.exports.randomFact = function(from) {
    return [
        h.pickRandom(l.subjects),
        h.pickRandom(l.activities),
        h.pickRandom(l.objects.concat(l.subjects.concat(from))),
        h.pickRandom(l.modifiers)].join(' ')
}

module.exports.about = function (from) {
    return 'LufBot V0.1 at your service. I was made to confuse. Why were you made, ' + from + '?'
}

module.exports.good = function (from) {
    return "I aim to please!, you're pretty " + h.pickRandom(l.good) + ' yourself, ' + from
}

module.exports.bad = function (from) {
    return "I'm sorry, but you're pretty " + h.pickRandom(l.bad) + ' yourself, ' + from
}

module.exports.help = function () {
    var returnVar = ''
    c.commands.forEach(command => {
        returnVar += command + ' - '
    });
    return 'LufBot responds to these commands: ' + returnVar
}

module.exports.yiff = function (clean) {
    return "I can't do that, you probably meant to use ```/yiff@e621bot " + clean + "```"
}

module.exports.bork = function (clean) {
    const borkSplit = h.replace(h.replaceList(clean, ['a','o'], 'u'), 'th', 'ze').split(' ')
    var returnVar = ''
    borkSplit.forEach(word => {
        if (h.coinflip(5)) {
            returnVar += h.pickRandom(l.boerk) + ' '
        }
        else {
            returnVar += word + ' '
        }
    });
    return returnVar
}