const login_modal = document.getElementById('myModal'),
	  userHeader = document.getElementById('userHeader'),
	  login_btn = document.getElementById('login_btn'),
	  nameInput = document.getElementById('nameInput'),
	  nicknameInput = document.getElementById('nicknameInput'),
	  messages = document.getElementById('messages-container'),
	  writing_msq = document.getElementById('writing-msg'),
	  users = document.getElementById('users-container'),
	  textMessage = document.getElementById('text'),
	  textSubmit = document.getElementById('textSubmit');

let nickname = sessionStorage.getItem('nickname') || false;
let scroll = false; // Help-variable for scrolling messages-container down


const socket = io.connect();

///////////////////////////////////////////////
///////////////// EVENTS /////////////////////
/////////////////////////////////////////////

// При завантаженні сторінки перевіряємо, чи є юзер в sessionStorage,
// якщо так, пропускаємо авторизацію
window.addEventListener('load', evt => {
	if (nickname) {
		document.body.removeChild(login_modal);
		userHeader.innerText = '@' + nickname;
		let user = {
			name: sessionStorage.getItem('name'),
			nickname: sessionStorage.getItem('nickname'),
			status: ''
		}
		socket.emit('new user', user, (data) => {});
	}
});

// Name & Nickname validation
nicknameInput.addEventListener('input', evt => {
	if (evt.target.value.length == 0) 
		nicknameInput.style.borderColor = '#eee';
	else if (!userNickValidation(evt.target)) 
		nicknameInput.style.borderColor = 'green';
	else 
		nicknameInput.style.borderColor = 'red';
});

nameInput.addEventListener('input', evt => {
	if (evt.target.value.length == 0)
		nameInput.style.borderColor = '#eee';
	else if (userNameValidation(evt.target)) 
		nameInput.style.borderColor = 'red';
	else 
		nameInput.style.borderColor = 'green';
});

// User login
login_btn.addEventListener('click', evt => {
	// Name & Nickname validation
	if (!validateNameAndNickname()) return;

	nickname = nicknameInput.value;
	userHeader.innerText = nickname;

	sessionStorage.setItem('nickname', nickname);
	sessionStorage.setItem('name', nameInput.value);

	let user = {
		name: nameInput.value,
		nickname: nicknameInput.value,
		status: ''
	}

	socket.emit('new user', user, (data) => {
		if (data)
			document.body.removeChild(login_modal);
	});
});

// Sending a message
textSubmit.addEventListener('click', evt => {
	let data = {
		nickname: nickname,
		content: textMessage.value,
		date: new Date()
	};
	textMessage.value = '';
	scroll = false;
	socket.emit('message', data);
});

textMessage.addEventListener('keyup', evt => {
	evt.preventDefault();
	if (evt.key == 'Enter') textSubmit.click();
});

// Якщо юзер набирає повідомлення, виводимо 'User is typing...'
textMessage.addEventListener('input', evt => {
	socket.emit('writing message', nickname, true);
});

// Якщо юзер припинив набирати повідомлення, видаляємо 'User is typing...'
textMessage.addEventListener('change', evt => {
	socket.emit('writing message', nickname, false);
});

// Забороняємо скролл донизу (до нових повідомлень), якщо юзер скроллить історію
messages.addEventListener('scroll', evt => {
	evt.stopPropagation();
	if (Math.round(evt.target.scrollTop) == (evt.target.scrollHeight-evt.target.clientHeight)){
		scroll = false;
		return;
	}
	else scroll = true;
});


///////////////////////////////////////////////
//////////////// SOCKETS /////////////////////
/////////////////////////////////////////////

// Виводить історію із 100 повідоблень
socket.on('history', (data) => {
	messages.innerHTML = '';
	data.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});
	if (data.length >= 10) {
		for (let i = 99; i >= 0; i--) {
			if (data.hasOwnProperty(i)) {
				addMessages(data[i]);
			}
		}
	}
	else {
		for (let i = data.length-1; i >= 0; i--) {
			if (data.hasOwnProperty(i)) {
				addMessages(data[i]);
			}
		}
	}
	if (scroll == false)
		messages.scrollTop = messages.scrollHeight;
});

// Нове повідомлення
socket.on('message', (data) => {
	addMessages(data);
	if (scroll == false)
		messages.scrollTop = messages.scrollHeight;
});

// Якщо юзер набирає повідомлення
socket.on('writing message', (data, val) => {
	if (val == true)
		writing_msq.innerHTML = '<i class="fas fa-pen"></i> @' + data + ' is typing...';
	else
		writing_msq.innerHTML = '';
});

// Список усіх юзерів
socket.on('get users', (data) => {
	users.innerHTML = '';
	let user, st_color;
	for (let i = 0; i < data.length; i++) {
		user = document.createElement('div');
		if (data[i].status == 'online') st_color = 'text-success';
		else if (data[i].status == 'just appeared') st_color = 'text-light';
		else if (data[i].status == 'just left') st_color = 'text-light';
		else  st_color = 'text-secondary';
		user.innerHTML = '<h6>@' + data[i].nickname + "</h6><span class='"+st_color+"'>" + data[i].status + '</span>';
		user.innerHTML += "<div>Name: " + data[i].name + '</div>';
		user.className = 'user-box bg-dark';
		users.appendChild(user);
	}
});


///////////////////////////////////////////////
/////////////// FUNCTIONS ////////////////////
/////////////////////////////////////////////

// Підсвічує повідомлення для юзера, якому воно адресоване
function sayToRecourse(name, el) {
	if (sessionStorage.getItem('nickname') == name.trim()) {
		el.setAttribute('style', 'background:#ffc107 !important;color:#333 !important');
	}
}

// Додає повідомлення в DOM
function addMessages(data) {
	var el = document.createElement('div');
	var msg = document.createElement('div');
	el.className = 'message-box';
	el.className += ' alert';
	if (data.nickname.length != 0) {
		el.innerHTML = '<h6>' + data.nickname + '</h6>';
		let date = new Date(data.date);
		el.innerHTML += '<span class="small font-italic">' + date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '</span>';
		if (data.nickname == sessionStorage.getItem('nickname')) {
			el.className += ' toright';
			el.className += ' alert-secondary';
		}
		else {
			el.className += ' alert-warning';
		}
	}
	else {
		el.className += ' border border-secondary text-center 	loggedout-msg';
	}
	if (data.content != undefined && (data.content).includes('@')) {
		let arr = data.content.split(' ');
		let recourse;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].includes('@')) {
				recourse = arr[i].substring(1);
			}
		}
		
		if (sessionStorage.getItem('nickname') == recourse) {
			sayToRecourse(recourse, el);
		}
	}
	
	msg.innerText = data.content;
	msg.className = 'msg';
	el.appendChild(msg);
	
	messages.appendChild(el);
}

// Name validation
function userNameValidation(el) {
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
function userNickValidation(el, val) {
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
function validateNameAndNickname() {
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