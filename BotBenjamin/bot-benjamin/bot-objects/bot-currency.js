module.exports = class BotCurrency {
	constructor(message) {
		this.answer = this.processCurrencyMessage(message);
	}

	// Конвертер валют
	processCurrencyMessage(message) {
		let textArr = message.split(' ');
		let fromCurrency = textArr[2], 
			toCurrency = textArr[4], 
			amount = textArr[1];
		return textArr[1] + ' ' + textArr[2] + ' = ' + this.convertCurrency(fromCurrency)(toCurrency)(amount) + ' ' + textArr[4];
	}

	// CURRYING
	convertCurrency(fromCurrency) {
		if (fromCurrency == 'dollar') {
			return function(toCurrency) {
				if (toCurrency == 'dollar') {
					return function(amount) {
						return amount;
					};
				}
				else if (toCurrency == 'euro') {
					return function(amount) {
						return amount*0.856;
					};
				}
				else if (toCurrency == 'hryvnia') {
					return function(amount) {
						return amount*26.6325;
					};
				}
			}
		}
		else if (fromCurrency == 'euro') {
			return function(toCurrency) {
				if (toCurrency == 'dollar') {
					return function(amount) {
						return amount*1.167;
					};
				}
				else if (toCurrency == 'euro') {
					return function(amount) {
						return amount;
					};
				}
				else if (toCurrency == 'hryvnia') {
					return function(amount) {
						return amount*31.1;
					};
				}
			}
		}
		else if (fromCurrency == 'hryvnia') {
			return function(toCurrency) {
				if (toCurrency == 'dollar') {
					return function(amount) {
						return amount*0.0375;
					};
				}
				else if (toCurrency == 'euro') {
					return function(amount) {
						return amount*0.0321;
					};
				}
				else if (toCurrency == 'hryvnia') {
					return function(amount) {
						return amount;
					};
				}
			}
		}
	}
	
}
