const quotes = require('../../data/bot-benjamin-storage').quotes;

module.exports = class BotQuotes {
	constructor() {
		this.answer = this.processQuoteMessage();
	}

	// Цитати
	processQuoteMessage() {
		return quotes[Math.floor(Math.random()*9)];
	}
	
}
