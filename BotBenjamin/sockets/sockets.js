// Services
const userService = require('../services/user');
const messageService = require('../services/message');
const connectionService = require('../services/connection');

module.exports = function (io) {
	io.on('connection', (socket) => {

		// Connect
		connectionService.connect(io, socket);
	
		// Disconnect
		socket.on('disconnect', () => {
			connectionService.disconnect(io, socket);
		});
	
		// New message
		socket.on('message', (msg) => {
			messageService.newMessage(io, msg);
		});
	
		// While message is writing ...
		socket.on('writing message', (nickname, val) => {
			userService.writeMessage(socket, nickname, val);
		});
	
		// Nickname validation -- all nicknames are unique
		socket.on('exist nickname', (nickname) => {
			userService.checkNickname(io, nickname);
		});
	
		// If new user appeared
		socket.on('new user', (data, callback) => {
			userService.newUser(io, socket, data, callback);
		});

		// BOT BENJAMIN
		socket.on('Bot Benjamin', (msg) => {
			messageService.callBenjamin(io, msg);
		})

	});
}