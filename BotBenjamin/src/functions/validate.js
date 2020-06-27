import {socket} from '../global-vars';

// Name validation
export function userNameValidation(el) {
	if (/^[A-Za-z\s]+$/.test(el.value)){
		return false;
	}
	if (el.value.length == 0) {
		el.placeholder = 'Enter your name!';
		el.style.borderColor = 'red';
		return true;
	}
	el.placeholder = 'You can use only A-Z letters!';
	el.style.borderColor = 'red';
	return true;
}

// NickName validation (dont touch)
export function userNickValidation(el, val) {
	let res = false;
	if (val == true) return true;
	socket.emit('exist nickname', el.value);
	socket.on('exist nickname', (val) => {
		if (val == true) {
			nicknameInput.style.borderColor = 'red';
			nicknameInput.placeholder = 'This nick is already existed';
		}
	});
	if (el.value.length == 0) {
		el.placeholder = 'Enter your nickname!';
		el.style.borderColor = 'red';
		res = true;
	}
	return res;
}

// Both name & nickname validation (dont touch)
export function validateNameAndNickname() {
	if (nicknameInput.style.borderColor == 'red' || nicknameInput.value.length == 0) {
		if (nicknameInput.value.length == 0) {
			nicknameInput.placeholder = 'Enter your nickname!';
			nicknameInput.style.borderColor = 'red';
		}
		nicknameInput.value = '';
		if (userNameValidation(nameInput)) {
			console.log(2);
			nameInput.value = '';
			return false;
		}
		return false;
	}
	if (userNameValidation(nameInput)) {
		nameInput.value = '';
		if (nicknameInput.style.borderColor == 'red' || nicknameInput.value.length == 0) {
			nicknameInput.value = '';
			return false;
		}
		return false;
	}
	return true;
}