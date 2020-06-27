let users = require('../data/data-storage').users;
// Extra functions
const update = require('../functions/updateStatus');

function UserRepository() {}

function createNewUser(io, socket, data, callback) {
	callback(true);
	if (users.find(el => el.nickname == data.nickname)) {
		socket.nickname = data.nickname;
		socket.name = data.name;
		users.find(el => el.nickname == data.nickname).name = data.name;
		update.updateOnlineStatus(io, data.nickname);
	}
	else {
		socket.name = data.name;
		socket.nickname = data.nickname;
		users.push(data);
		update.updateOnlineStatus(io, data.nickname);
	}
	io.emit('get users', users);
}

function checkIfNicknameExists(socket, nickname) {
	if (users.find(el => el.nickname == nickname) && (users.find(el => el.nickname == nickname).status == 'online' || users.find(el => el.nickname == nickname).status == 'just appeared')) {
		socket.emit('exist nickname', true);
	}
	else socket.emit('exist nickname', false);
}

function showWritingProcess(socket, nickname, val) {
	if(users.find(el => el.nickname == nickname))
	socket.broadcast.emit('writing message', users.find(el => el.nickname == nickname).nickname, val);
}

UserRepository.prototype.createNewUser = createNewUser;
UserRepository.prototype.checkIfNicknameExists = checkIfNicknameExists;
UserRepository.prototype.showWritingProcess = showWritingProcess;

module.exports = new UserRepository();