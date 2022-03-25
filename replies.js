/*
Simple (conceptually and/or codewise) replies goes here
*/

const l = require('./wordLists')
const h = require('./helpers')
const c = require('./commands')

module.exports.asteriskAction = function (clean, from) { //todo get only center
    clean = h.replace(clean, '*', '')
    if (h.matchWord(clean, 'you')) {
        return '*' + clean + ' back!~*'
    }
    else {
        for (i = 0; i < l.names.length; i++) {
            if (h.matchWord(clean, l.names[i])) {
                clean = clean.replace(l.names[i], from)
                return '*' + clean + '*'
            }
        }
        return '0w0 *' + clean + ' all over ' + from + '*'
    }
}

module.exports.owo = function (clean) {
    return h.replace(h.replaceList(clean, ['l', 'r'], 'w'), 'u', 'oo')
}

module.exports.sarcasm = function(input) {
    let split = input.split('');
    for (let i = 0; i < split.length; i++) {
        if(i % 2 == 1) split[i] = split[i].toUpperCase();
    }
    return split.join('');
}

module.exports.default = function (from) {
    h.warn("Default response")
    return h.pickRandom(l.iDontUnderstand) + '. ' + h.pickRandom(l.doMe) + ', ' + from
}

module.exports.who = function (clean, from) {
    const doer = h.pickRandom(l.subjects.concat(from))
    var replace = [["lufbot", "me"], ["?", "!"]]
    var wordSwaps = [["yours", "mine"], ["your", "my"], ["you", "i"]]

    var split = clean.split(' ')
    for (let modIndex = 0; modIndex < l.modalVerbs.length; modIndex++) {
        var strIndex = split.indexOf(l.modalVerbs[modIndex]) //find modular verb

        if (strIndex != -1 && strIndex < split.length - 1) {//to make sure it can move it
            if (h.matchWordFromList(split[strIndex + 1], l.pronouns)) {//check that it's a pronoun that we're mobbing
                split[strIndex] = split[strIndex + 1]
                split[strIndex + 1] = l.modalVerbs[modIndex]
            }
        }
    }

    if (h.matchWord(split[split.length - 1], "you")) { //override for objective me, easily broken
        split[split.length - 1] = h.replace(split[split.length - 1], "you", "me")
    }

    clean = split.join(" ")

    //REPLACE
    for (let replaceIndex = 0; replaceIndex < replace.length; replaceIndex++) {
        clean = h.replaceWord(clean, replace[replaceIndex][0], replace[replaceIndex][1])
    }

    //SWAP
    for (let swapIndex = 0; swapIndex < wordSwaps.length; swapIndex++) {
        clean = h.swapWords(clean, wordSwaps[swapIndex][0], wordSwaps[swapIndex][1])
    }

    return (h.matchWord('who') ?
        h.replaceWord(clean, 'who', doer) :
        doer + clean
    )
}

module.exports.beep = function (clean) {
    return h.replace(
        h.replace(
            h.replace(clean, 'ee', 'ᛟ')
            , 'oo', 'ee')
        , 'ᛟ', 'oo')
}

module.exports.fake = function (clean) {
    if (!h.matchWord(clean, 'fake')) {
        return h.replace(clean, 'gay', 'gay and fake')
    }
    else if (!h.matchWord(clean, 'gay')) {
        return h.replace(clean, 'fake', 'fake and gay')
    }
    else return h.replace(h.replace(h.replace(clean, 'fake', 'ᛟ'), 'gay', 'fake'), 'ᛟ', 'gay')
}

module.exports.navy = function () {
    return l.navy
}

module.exports.conspiracy = function () {
    return (
        h.pickRandom(l.conspiracy[0]) +
        h.pickRandom(l.conspiracy[1]) + 'can\'t ' +
        h.pickRandom(l.conspiracy[2]) +
        h.pickRandom(l.conspiracy[3]) +
        h.pickRandom(l.conspiracy[4])
    )
}

module.exports.fact = function () {
    return exports.randomFact()
    //return h.pickRandom(l.facts)
}

module.exports.randomFact = function (from) {
    return [
        h.pickRandom(l.subjects),
        h.pickRandom(l.activities),
        h.pickRandom(l.objects.concat(l.subjects.concat(from))),
        h.pickRandom(l.modifiers)].join(' ')
}

module.exports.about = function (from) {
    return "LufBot V0.1 at your service, I was made by @Lufteluke to confuse. I'm open source and can be found at https://github.com/Lufteluke/LufBot \nWhy were you made, " + from + '?'
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
    return 'LufBot responds to these commands: ' + returnVar.slice(0, -3)
}

module.exports.secrets = function () {
    var returnVar = ''
    c.secretCommands.forEach(command => {
        returnVar += command + ' - '
    });
    return 'LufBot responds to these commands too: ' + returnVar.slice(0, -3)
}

module.exports.yiff = function (clean) {
    return "I can't do that, you probably meant to use \n/yiff@e621bot " + clean
}

module.exports.bork = function (clean, level) {
    if (clean.length === 0) return h.pickRandom(l.boerk)

    const borkSplit = h.replace(h.replaceList(clean, ['a', 'o'], 'u'), 'th', 'ze').split(' ')
    var returnVar = ''
    borkSplit.forEach(word => {
        if (h.coinflip(level)) {
            returnVar += h.pickRandom(l.boerk) + ' '
        }
        else {
            returnVar += word + ' '
        }
    });
    return returnVar
}

module.exports.dyr = function (clean, level) {
    if (clean.length === 0) return 'dyr'
    var returnVar = ''
    clean.split(' ').forEach(word => {
        if (h.coinflip(level)) {
            returnVar += word.split(/\b/)[0] + h.pickRandom(l.lufCompounds) + ' '
        }
        else {
            returnVar += word + ' '
        }
    });
    return returnVar
}

module.exports.lufReplace = function (clean) {
    l.lufWords.forEach(replacement => {
        clean = h.replace(clean, replacement[0], replacement[1])
    });

    return exports.dyr(clean, 5)
}

module.exports.echoMsg = function (msg) {
    return JSON.stringify(msg)
}