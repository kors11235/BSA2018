let connections = require('../data/data-storage').connections;
let messages = require('../data/data-storage').messages;
const update = require('../functions/updateStatus');


function ConnectionRepository() {}

function connectUser(io, socket) {
	connections.push(socket);
	console.log('Connected: %s sockets', connections.length);
	io.emit('history', messages);
}

function disconnectUser(io, socket) {
	if (socket.nickname == undefined) {
		connections.splice(connections.indexOf(socket), 1);
		return;
	};
	connections.splice(connections.indexOf(socket), 1);
	console.log('Disconnected: %s sockets', connections.length);
	update.updateOfflineStatus(io, socket.nickname);
}


ConnectionRepository.prototype.connectUser = connectUser;
ConnectionRepository.prototype.disconnectUser = disconnectUser;

module.exports = new ConnectionRepository();