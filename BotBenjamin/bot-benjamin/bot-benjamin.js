const BotNotes = require('./bot-objects/bot-notes');
const BotCurrency = require('./bot-objects/bot-currency');
const BotWeather = require('./bot-objects/bot-weather');
const BotAdvice = require('./bot-objects/bot-advice');
const BotQuotes = require('./bot-objects/bot-quotes');

// Клас Бота Бенжаміна, який по суті обробляє всі запити @bot
// Паттерн FACADE
module.exports = class BotBenjamin {

	constructor (message) {
		// Усі можливі команди
		this.currencyRequestPattern = new RegExp(/^Convert\s\d+(\.\d+)?\s(dollar|euro|hryvnia)\sto\s(dollar|euro|hryvnia)$/i);
		this.weatherRequestPattern = new RegExp(/^What is the weather\s(today|tomorrow|on Monday|on Tuesday|on Wednesday|on Thursday|on Friday|on Saturday|on Sunday)\sin\s(Lviv|Kiyv|Kharkiv|Odesa|Dnipro)?[?]?$/i);
		this.adviceRequestPattern = new RegExp(/^(.*)\s#@\)₴\?\$0/i);
		this.quoteRequestPattern = new RegExp(/^show quote/i);
		// Команди для нотаток винесені окремо, та 'прикручені' до фасаду
		this.noteRequests = new BotNotes(message);

		this.message = message;
		this.answer = this.processMessage(this.message);
	}
	
	// Ідентифікація команди, повертається відповідь від бота
	// Pattern FACTORY
	processMessage(message) {
		let commandProcessor;

		if (this.currencyRequestPattern.test(message)) {
			commandProcessor = new BotCurrency(message);
		}
		else if (this.weatherRequestPattern.test(message)) {
			commandProcessor = new BotWeather(message);
		}
		else if (this.adviceRequestPattern.test(message)) {
			commandProcessor = new BotAdvice();
		}
		else if (this.quoteRequestPattern.test(message)) {
			commandProcessor = new BotQuotes();
		}
		else if (this.noteRequests.answer) {
			commandProcessor =  this.noteRequests;
		}

		if (commandProcessor) {
			return commandProcessor.answer;
		}
		else {
			return 'Speak more crearly, I`m just a bot written by girl';
		}
	}

}
