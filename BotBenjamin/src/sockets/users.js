import { socket } from '../global-vars';
import { displayAllUsers, displayWritingProcess } from './functions/users';

const writing_msq = document.getElementById('writing-msg');
const users = document.getElementById('users-container');

// Якщо юзер набирає повідомлення
socket.on('writing message', (data, val, writing_msq) => {
	displayWritingProcess(data, val, writing_msq);
});

// Список усіх юзерів
socket.on('get users', (data) => {
	displayAllUsers(data, users);
});