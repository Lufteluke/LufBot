# Lufbot

#### Lufbot is a Telegram messenger bot that runs in Node. It's mostly useless and for fun, serving as entertainment and coding excersise in our chat. He could be useful as a platform from which to make useful bots or features, however.


## Environment

* Lufbot runs in `node 8.11.1`, using `npm 6.4.1`, other things might work, but I haven't tested
* This code is designed to be run on Azure, a free F tier app service should be just fine
* Running it elsewhere should be fine, but the environmental variables might have to be set up differently (API keys and such)


## Getting started

* [install npm](https://www.npmjs.com/get-npm) if you haven't already. To manage npm versions, I recommend using [nvm](https://github.com/nvm-sh/nvm)
* open a terminal, `cd` to root of this project
* run `install npm`
* run `npm test` for testing purposes, as getting messages correctly formatted piped is not something I wanna do
* run `npm start` to run the actual bot. This will likely not do much on your local machine other than squawk the

## Adding a new command

* Add your command to the list in [commands.js](commands.js), this will trigger [sentenceAnalyser.js](sentenceAnalyser.js) to actually look for it
* In [sentenceAnalyser.js](sentenceAnalyser.js), in the `parser(message)` function, there's a `switch/case`, your command needs to be added here
* In the case, add either a [replies.js](replies.js) function or a function to a new `js` file you've made. Whatever it `returns` will be sent to the user.
* Please write a new test in [test.js](test.js) to make sure that it neither breaks other things nor gets broken in the future

## Structual overview

## [index.js](index.js)

* Starts the app, sets important variables, receives external data, strips the parts we actually want and send it on to [sentenceAnalyser.js](sentenceAnalyser.js).

## [test.js](test.js) 

* Will run tests, usually by sending dummy message shaped strings directly to the [sentenceAnalyser.js](sentenceAnalyser.js).

## [sentenceAnalyser.js](sentenceAnalyser.js)

* Takes the message and strips various parts down. It detects if any of the [commands.js](commands.js) are present and triggers on certain strings. Depending on the command or text recognised, it may forward the message to [replies.js](replies.js) or directly to the more complex scripts. It returns the result back to [index.js](index.js) which sends it to the user.

## [replies.js](replies.js)

* Is filled with various commands for simple-ish replies, it returns a string back to [sentenceAnalyser.js](sentenceAnalyser.js)

## [brainfuck.js](brainfuck.js) / [piglatin.js](piglatin.js) / [memory.js](memory.js)

* Are replies that are more elaborate and would be too big to put in [replies.js](replies.js). They're also nice to exclude as in some regard they might warrant their own bots.

## [helpers.js](helpers.js)

* Contain helper classes that help unify the way that searches and certain fucntions are done (such as logging). Many of the functions are redundant, but they're there for ease of changing and future optimisation. Please use them, even if there are simple replacements.

## [dataTypes.js](dataTypes.js)

* Contain certain structures for easier testing and more strongly typed scripting, mostly. It also harbours some functions to run on those types

## [commands.js](commands.js)

* Contain the commands that the bot are designed to trigger on. Add terms here if you wish to add a new `/command`

## [wordLists.js](wordLists.js)

* Contains a collection of words and sentences that are used for replies and text recognition. The dictionary.

## Licence

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
