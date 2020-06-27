const BotBenjamin = require('../bot-benjamin/bot-benjamin');
const data = require('../data/data-storage');
let messages = data.messages;


function MessageRepository() {}

function createNewMessage(socket, msg) {
	messages.push(msg);
	socket.emit('history', messages);
}

function getBenjaminsAnswer(socket, msg) {
	let bot = new BotBenjamin(msg);
	let data = {
		nickname: 'Bot Benjamin',
		content: bot.answer,
		date: new Date()
	};
	if (!bot.answer) {
		data.content = 'It seems, that bot is broken :(';
	}
	createNewMessage(socket, data);
}


MessageRepository.prototype.createNewMessage = createNewMessage;
MessageRepository.prototype.getBenjaminsAnswer = getBenjaminsAnswer;

module.exports = new MessageRepository();