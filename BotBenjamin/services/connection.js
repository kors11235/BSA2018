const connectionRepo = require('../repositories/connection');

module.exports = {
	connect: (io, socket) => {
		connectionRepo.connectUser(io, socket);
	},

	disconnect: (io, socket) => {
		connectionRepo.disconnectUser(io, socket);
	}
}