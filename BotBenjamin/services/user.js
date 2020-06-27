const userRepo = require('../repositories/user');

module.exports = {
	newUser: (io, socket, data, callback) => {
		userRepo.createNewUser(io, socket, data, callback);
	},

	checkNickname: (socket, nickname) => {
		userRepo.checkIfNicknameExists(socket, nickname);
	},

	writeMessage: (socket, nickname, val) => {
		userRepo.showWritingProcess(socket, nickname, val);
	}
}