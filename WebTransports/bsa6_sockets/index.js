const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Here i store my data
let messages = [];
let connections = [];
let users = [];


// Display html page
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/css/style.css', (req, res) => {
	res.sendFile(__dirname + '/public/css/style.css');
});

app.get('/script.js', (req, res) => {
	res.sendFile(__dirname + '/public/js/script.js');
});

// Connection
io.on('connection', (socket) => {
	connections.push(socket);
	console.log('Connected: %s sockets', connections.length);

	// Disconnect
	socket.on('disconnect', (data) => {
		if (socket.nickname == undefined) {
			connections.splice(connections.indexOf(socket), 1);
			return;
		};
		updateOfflineStatus(users.find(el => el.nickname == socket.nickname));
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets', connections.length);
	});

	// New message
	socket.on('message', (msg) => {
		messages.push(msg);
		io.emit('history', messages);
	});

	// While message is writing ...
	socket.on('writing message', (msg, val) => {
		socket.broadcast.emit('writing message', users.find(el => el.nickname == msg).nickname, val);
	});

	// Nickname validation -- all nicknames are unique
	socket.on('exist nickname', (nickname) => {
		if (users.find(el => el.nickname == nickname) && (users.find(el => el.nickname == nickname).status == 'online' || users.find(el => el.nickname == nickname).status == 'just appeared')) {
			io.emit('exist nickname', true);
		}
		else io.emit('exist nickname', false);
	});

	// If new user appeared
	socket.on('new user', (data, callback) => {
		callback(true);
		if (users.find(el => el.nickname == data.nickname)) {
			socket.nickname = data.nickname;
			socket.name = data.name;
			users.find(el => el.nickname == data.nickname).name = data.name;
			updateOnlineStatus(users.find(el => el.nickname == data.nickname));
		}
		else {
			socket.name = data.name;
			socket.nickname = data.nickname;
			users.push(data);
			updateOnlineStatus(users.find(el => el.nickname == data.nickname));
		}
		updateUsernames();
	});

	// Shows to users all message history on connection
	socket.emit('history', messages);
});

http.listen(8000, () => {
	console.log('Listening on *8000');
});


///////////////////////////////////////////////
////////////// FUNCTIONS /////////////////////
/////////////////////////////////////////////

function updateUsernames() {
	io.sockets.emit('get users', users);
}

function updateOnlineStatus(user) {
	user.status = 'just appeared';
	updateUsernames();
	setTimeout(() => {
		user.status = 'online';
		updateUsernames();
	}, 60000);
}

function updateOfflineStatus(user) {
	user.status = 'just left';
	updateUsernames();
	setTimeout(() => {
		user.status = 'offline';
		updateUsernames();
	}, 60000);

	
	setTimeout(() => {
		let msg = {
			nickname: '',
			content: '@' + user.nickname + ' logged out',
			date: new Date()
		}
		if (user.status == 'offline'){
			messages.push(msg);
			io.sockets.emit('history', messages);
			updateUsernames();
		}
		
	}, 62000);
}