import { addNewMessage, addNewMessageByEnter, scrollMessages, checkForBot } from './functions/message';
import {socket, nickname} from '../global-vars';

const textMessage = document.getElementById('text');
const messages = document.getElementById('messages-container');

// Sending a message
textSubmit.addEventListener('click', () => {
	addNewMessage();
});
textMessage.addEventListener('keyup', evt => 
	addNewMessageByEnter(evt)
);

// Якщо юзер набирає повідомлення, виводимо 'User is typing...'
textMessage.addEventListener('input', evt => {
	socket.emit('writing message', nickname, true);
});

// Якщо юзер припинив набирати повідомлення, видаляємо 'User is typing...'
textMessage.addEventListener('change', evt => {
	socket.emit('writing message', nickname, false);
});

// Забороняємо скролл донизу (до нових повідомлень), якщо юзер скроллить історію
messages.addEventListener('scroll', evt => 
	scrollMessages(evt)
);