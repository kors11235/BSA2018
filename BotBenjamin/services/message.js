const messageRepo = require('../repositories/message');

module.exports = {
	newMessage: (socket, msg) => {
		messageRepo.createNewMessage(socket, msg);
	},

	callBenjamin: (socket, msg) => {
		messageRepo.getBenjaminsAnswer(socket, msg);
	}
}