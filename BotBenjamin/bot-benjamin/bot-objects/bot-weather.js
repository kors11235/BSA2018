const weatherData = require('../../data/bot-benjamin-storage').weatherData;

module.exports = class BotWeather {
	constructor(message) {
		this.answer = this.processWeatherMessage(message);
	}

	// Прогноз погоди
	processWeatherMessage(message) {
		let ans;
		let messageArr = message.split(' ');
		if (messageArr.find(el => el == 'on')) 
			messageArr.splice(messageArr.indexOf('on'), 1);

		let city = (messageArr[6][messageArr[6].length-1]=='?') ? messageArr[6].slice(0, -1) : messageArr[6];
		let day = messageArr[4];
		let data = weatherData;

		return this.getWeather(city)(day)(data);
	}

	getWeather(where) {
		const getDayWeek = this.getDayWeek,
			  getTemperature = this.getTemperature,
			  getWeatherStatus = this.getWeatherStatus;

		return function(when) {
			let on = (when.toLowerCase() !='today' && when.toLowerCase() != 'tomorrow') ? 'on ' : '';
			let day = getDayWeek(when);
			return function(weatherData) {
				let temperature = getTemperature(weatherData, where, day);
				let weatherStatus = getWeatherStatus(temperature); 
		
				return 'The weather is ' + weatherStatus + ' in ' + where + ' ' + on + when + ', temperature ' + temperature + ' C'; 
			}
		}
	}
	
	getDayWeek(when) {
		let day;
		let weekday = new Array(7);
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		weekday[0] =  "Sunday";
	
		if (when.toLowerCase() == 'today') {
			day = weekday[(new Date()).getDay()];
		} else if (when.toLowerCase() == 'tomorrow') {
			day = weekday[(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).getDay()];
		} else {
			day = weekday.find(el => el.toLowerCase() == when.toLowerCase());
		}
	
		return day;
	}
	
	getTemperature(weatherData, where, day) {
		for (let weekDay in weatherData) {
			if (where.toLowerCase() == weekDay.toLowerCase()) {
				for (let key in weatherData[weekDay]) {
					if (key == day.toLowerCase()) return weatherData[weekDay][key];
				}
			}
		}
	}
	
	getWeatherStatus(temperature) {
		if (temperature >= 30) {
			return 'too hot';
		} else if (temperature < 30 && temperature > 25) {
			return 'hot';
		} else if (temperature < 26 && temperature > 16) {
			return 'warm';
		} else if (temperature < 17 && temperature > 9) {
			return 'cool';
		} else if (temperature < 10 && temperature > 0) {
			return 'cold';
		} else if (temperature < 1 && temperature > -11) {
			return 'frozy';
		} else if (temperature < -10) {
			return 'ICE AGE';
		}
	}
	
}