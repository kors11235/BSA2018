import {scroll, socket, nickname } from '../../global-vars';
const textMessage = document.getElementById('text');

export function addNewMessage() {
	let message = textMessage.value;
	let data = {
		nickname: nickname,
		content: message,
		date: new Date()
	};
	socket.emit('message', data);

	if (message.startsWith('@bot')) {
		// Pattern proxy es2015
		let botRequest = message.replace('@bot', '').trim();
		socket.emit('Bot Benjamin', botRequest);
	}
	scroll = false;
	textMessage.value = '';
}

export function addNewMessageByEnter(evt) {
	evt.preventDefault();
	if (evt.key == 'Enter') addNewMessage(socket);
}

export function scrollMessages(evt) {
	evt.stopPropagation();
	if (Math.round(evt.target.scrollTop) == (evt.target.scrollHeight-evt.target.clientHeight)){
		scroll = false;
		return;
	}
	else scroll = true;
}
