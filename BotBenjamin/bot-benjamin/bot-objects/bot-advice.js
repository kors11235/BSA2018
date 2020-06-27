const advice = require('../../data/bot-benjamin-storage').advice;

module.exports = class BotAdvice {
	constructor() {
		this.answer = this.processAdviceMessage();
	}

	// Поради
	processAdviceMessage() {
		return advice[Math.floor(Math.random()*8)];
	}
	
}
