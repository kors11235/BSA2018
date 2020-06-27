import {socket } from '../../global-vars';
let nickname = sessionStorage.getItem('nickname') || false;
const loginModal = document.getElementById('myModal');

export function showLoginForm() {
	if (nickname) {
		document.body.removeChild(loginModal);
		userHeader.innerText = '@' + nickname;
		let user = {
			name: sessionStorage.getItem('name'),
			nickname: sessionStorage.getItem('nickname'),
			status: ''
		}
		socket.emit('new user', user, (data) => {});
	}
}

export function highlightLoginErrors(evt, validate) {
	if (evt.target.value.length == 0) 
		evt.target.style.borderColor = '#eee';
	else if (!validate(evt.target)) 
		evt.target.style.borderColor = 'green';
	else 
		evt.target.style.borderColor = 'red';
}

export function loginUser(validate) {
	// Name & Nickname validation
	if (!validate()) return;

	console.log(nickname);

	nickname = nicknameInput.value;
	userHeader.innerText = '@'+nickname;

	sessionStorage.setItem('nickname', nickname);
	sessionStorage.setItem('name', nameInput.value);

	let user = {
		name: nameInput.value,
		nickname: nicknameInput.value,
		status: ''
	}

	socket.emit('new user', user, (data) => {
		if (data) document.body.removeChild(loginModal);
	});
}