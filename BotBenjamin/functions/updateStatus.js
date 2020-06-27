let users = require('../data/data-storage').users;
let messages = require('../data/data-storage').messages;

module.exports = {
	updateOnlineStatus: (io, nickname) => {
		let user = users.find(el => el.nickname == nickname);
		user.status = 'just appeared';
		io.emit('get users', users);
		setTimeout(() => {
			user.status = 'online';
			io.emit('get users', users);
		}, 60000);
	},
	
	updateOfflineStatus: (socket, nickname) => {
		let user = users.find(el => el.nickname == nickname);
		user.status = 'just left';
		socket.emit('get users', users);
		setTimeout(() => {
			user.status = 'offline';
			socket.emit('get users', users);
		}, 60000);
	
		
		setTimeout(() => {
			let msg = {
				nickname: '',
				content: '@' + user.nickname + ' logged out',
				date: new Date()
			}
			if (user.status == 'offline'){
				messages.push(msg);
				socket.emit('history', messages);
				socket.emit('get users', users);
			}
			
		}, 62000);
	}
}