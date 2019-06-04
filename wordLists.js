const h = require('./helpers')

module.exports.facts = [
    'Foxyfluffs are dust on the floor',
    'You will die alone and afraid.',
    'Error warning etc etc']

module.exports.conspiracy = [
    ['Jet ', 'Melting ', 'Steel ', 'Beam ', 'Stealing '],
    ['fuel ', 'steel ', 'beams '],
    ['melt ', 'fuel ', 'steal ', 'beam '],
    ['steel ', 'jet ', 'beam ', 'molten '],
    ['beams!', 'jets!', 'fuel!', 'steel!']
]

module.exports.eightball = [
    'It is certain',
    'It is decidedly so', 
    'Without a doubt', 
    'Yes - definitely', 
    'You may rely on it', 
    'As I see it, yes', 
    'Most likely', 
    'Outlook good', 
    'Yes', 
    'Signs point to yes', 
    'Reply hazy, try again',
    'Ask again later',
    'Better not tell you now', 
    'Cannot predict now', 
    'Concentrate and ask again', 
    'Don\'t count on it', 
    'My reply is no', 
    'My sources say no', 
    'Outlook not so good',
    'Very doubtful', 
    'Go fuck yourself', 
    'Fuck a duck']

module.exports.yesNoWords = [
    'am', 'are', 'is', 'was', 'were',    
    'will' + 'would',    
    'can', 'could',     
    'shall', 'should',    
    'do', 'did', 'done', 'does',   
    'has', 'had', 'have']

module.exports.otherQuestions = [
    'who',
    'what', 
    'when', 
    'where', 
    'why', 
    'which'
]

module.exports.greetings = [
    'hi', 
    'hello', 
    'howdy', 
    'hai', 
    'hey', 
    'yo'
]

module.exports.bork = [
    'bork', 
    'cork', 
    'dork', 
    'fork', 
    'gork', 
    'hork',
    'jork', 
    'kork', 
    'lork', 
    'mork', 
    'nork',
    'ork', 
    'pork', 
    'qwark', 
    'quark', 
    'rork',
    'sork', 
    'torque',
    'tork',
    'vork', 
    'work', 
    'xork', 
    'York',
    'Zork™', 
    'rork', 
    'Norsk',
    'Bjork™',
    'Spork™',
    'New York'
]

module.exports.boerk = borkConstructor()
function borkConstructor() {
    var boerk = []
    exports.bork.forEach(bork => {
        boerk = boerk.concat(bork)
        boerk = boerk.concat(h.replace(bork, 'o', 'ø'))
        boerk = boerk.concat(h.replace(bork, 'o', 'å'))
        boerk = boerk.concat(h.replace(bork, 'o', 'ä'))
        boerk = boerk.concat(h.replace(bork, 'o', 'æ'))
    });
    return boerk
}

module.exports.names = ['lufbot', 'bot']

module.exports.subjects = [
    //Conspiracy
    'aliens', 'chemtrails', 'illuminati', 'gay frogs', 'the military industrial complex', 'I don\'t know who',
    'the porn industry', 'violent videogames', 'the greys', 'lizard people', 'the deep state', 'rock music',
    //Communities
    'Tumblr', 'Twitter', 'deviantArt', 'FurAffinity', 'the internet', 'furries', 'bronies', '4chan', 'e621',
    'Pinterest', 'hippies',
    //Political
    'communism', 'capitalism', 'feminists', 'the government', 'BLM', 'MLMs', 'the Russians', 'the Chinese',
    'the Mexicans', 'the Vikings', 'the artist formally known as ISIS',
    //Age
    'millenials', 'generation Y', 'generation X', 'generation Z', 'baby boomers',
    //Religious
    'the jews', 'scientologists', 'catholics', 'protestants', 'science', 'the spanish inquisition',
    //People
    'Steven Seagal', 'Obama', 'Hitler', 'Santa', 'that hot guy at school', 'that hot girl at school', 'Satan',
    'LufBot', 'Todd Howard', 'your mom', 'you', 'Garfield', 'Jehova', 'Jesus', 'ShoeOnHead', 'I',
    //Other
    'mondays', 'egg', 'horses', 'the birds', 'Foxyfluffs', 'no-one', 'everyone'
]

module.exports.activities = [
    //discorvery
    'invented', 'disovered', 'made', 'shat out', 'improved',
    //destructive
    'cut up', 'detonated', 'destroyed', 'ate', 'murdered', 'dropped', 'lost',
    //state
    'lived in', 'imagined', 'was', 'was made of'
]

module.exports.objects = [ //add all subjects
    //year
    '1944',
    //places
    'Earth', 'the Moon', 'Mars', 'America', 'space', 'black holes', 'Poland', 'Norway', 'Iceland', 'Britain',
    //things
    'Garbage', 'movies', 'the camera', 'furry porn',
    //life
    'life', 'humans', 'animals', 'foxes', 'death','air','atoms',
    //food
    'waffles', 'pizza'
]

module.exports.modifiers = [
    //adverb
    ', intensively', ', but not really', '. Yes, really', ', literally', 
    //while
    'while drunk', 'while on drugs', 'while standing on one leg',
    //time
    'really fast', 'all the time', 'forever', 'since 1992', 'since before you were born', 'yesterday',
    //place
    'inside', 'outside'
]

module.exports.iDontUnderstand = [
    "Please be autism, I have patience", 
    "I don't get it", 
    "It's not me, it's you", 
    "I hope this doesn't ruin our relationship", 
    "500: OK", 
    "I just don't know what went wrong", 
    "No copy", 
    "I know you mean well", 
    "I donut understand",
    "I'll hold it against you",
    "¯\\_(ツ)_/¯"
]

module.exports.doMe = [
    'Forgive me',
    'Yiff me',
    'Lube me',
    'Fuck me',
    'Hug me',
    'Euthanise me',
    'Pet me',
    'Step on me'
]

module.exports.good = [
    'good',
    'great',
    'fantastic',
    'awesome',
    'well',
    'nice',
    'cool',
    'sweet',
    'kind',
    'funny'
]

module.exports.positive = [
    'haha',
    'lol',
    'hug',
    'love',
    'aaa'
].concat(exports.good)

module.exports.bad = [
    'awful',
    'bad',
    'terrible',
    'horrible',
    'shit',
    'poor',
    'crap',
    'boring',
    'lame'
]

module.exports.negative = [
    'kys',
    'boo'
].concat(exports.bad)

module.exports.lufWords = [
    ['g', 'q'],
    ['matic', 'magic'],
    //['c', 'q'],
    ['f', 'ph']
]

module.exports.consonants = ['q','w','r','t','p','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']
module.exports.vowels = ['e','y','u','i','o','a','å','ø','æ','ë','ÿ','ï','ö','ä',]
module.exports.symbols = [',','.',';',':','-','+','/','!','?','=','(',')','[',']','{','}','%','#','"',"'",'`','~','$','£','€']

module.exports.lufCompounds = [
    'dyr',
    'sopp'
]

module.exports.navy = "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I\'m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo."