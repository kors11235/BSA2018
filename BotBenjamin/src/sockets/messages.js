import { displayAllMessages, newMessage } from './functions/messages';
import { socket } from '../global-vars';
const messages = document.getElementById('messages-container');

// Виводить історію із 100 повідоблень
socket.on('history', (data) => {
	displayAllMessages(data, messages);
});

// Нове повідомлення
socket.on('message', (data) => {
	newMessage(data, messages);
});