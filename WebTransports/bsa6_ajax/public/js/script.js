const userHeader = document.getElementById('userHeader'),
	  nameButton = document.getElementById('nameButton'),
	  nameInput = document.getElementById('nameInput'),
	  nicknameInput = document.getElementById('nicknameInput'),
	  messages = document.getElementById('messages-container'),
	  users = document.getElementById('users-container'),
	  text = document.getElementById('text'),
	  textSubmit = document.getElementById('textSubmit');

const nickname = sessionStorage.getItem('user_nickname') || 'Nickname';
let scroll = false; // help-variable for scrolling messages down


//////////////////////////////////////
///////////// EVENTS /////////////////
//////////////////////////////////////

// Add new user if he doesnt exist in session storage
window.addEventListener('load', evt => {
	getData();
	if (!sessionStorage.getItem('user_nickname')) {
		document.getElementById('myModal').setAttribute('style', 'display:block !important');
	}
	else {
		document.body.removeChild(document.getElementById('myModal'));
		userHeader.innerText = '@' + sessionStorage.getItem('user_nickname');
		let data_user = {
			name: sessionStorage.getItem('user_name'),
			nickname: sessionStorage.getItem('user_nickname'),
			isOnline: true
		};
		ajaxRequest({
			method: 'POST',
			url: '/users/',
			data: data_user
		})
	}
	messages.scrollTop = messages.scrollHeight;
	scroll = false;
	setTimeout(()=>{scroll = false;},1000);
});

// Delete user if unload
window.onbeforeunload = function(){
	ajaxRequest({
		method: 'DELETE',
		url: '/users/' + sessionStorage.getItem('user_nickname')
	});
};

window.onunload = function() {
	ajaxRequest({
		method: 'DELETE',
		url: '/users/' + sessionStorage.getItem('user_nickname')
	});
};
	
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
	else if (!userNameValidation(evt.target)) 
		nameInput.style.borderColor = 'red';
	else 
		nameInput.style.borderColor = 'green';
});

nameButton.addEventListener('click', evt => {
	// Name & Nickname validation
	let isInDb = false;
	if (userNickValidation(nicknameInput, isInDb)) {
		nicknameInput.value = '';
		if (!userNameValidation(nameInput)) {
			nameInput.value = '';
			return;
		}
		return;
	}
	document.body.removeChild(document.getElementById('myModal'));

	// Saving nama & nickname
	userHeader.innerText = '@' + nicknameInput.value;
	sessionStorage.setItem('user_name', nameInput.value);
	sessionStorage.setItem('user_nickname', nicknameInput.value);

	// Adding user
	let data_user = {
		name: nameInput.value,
		nickname: nicknameInput.value,
		isOnline: true
	};

	if (isInDb == false)
		ajaxRequest({
			method: 'POST',
			url: '/users',
			data: data_user
		});
});
	
// Send mesage
textSubmit.addEventListener('click', evt => {
	if (text.value.length == 0) return;
	let data_message = {
		nickname: sessionStorage.getItem('user_nickname'),
		content: text.value
	};
	text.value = '';
	ajaxRequest({
		method: 'POST',
		url: '/messages',
		data: data_message
	});
	scroll = false;
	setTimeout(function() {
		messages.scrollTop = messages.scrollHeight;
	}, 500);
});

text.addEventListener('keyup', evt => {
	evt.preventDefault();
    if (evt.key == 'Enter') {
		textSubmit.click();
		scroll = false;
	}
});

messages.addEventListener('scroll', evt => {
	evt.stopPropagation();
	if (Math.round(evt.target.scrollTop) == (evt.target.scrollHeight-evt.target.clientHeight)){
		scroll = false;
		return;
	}
	else scroll = true;
});

	
// Getting data from server (users & messages)
const getData = () => {
	ajaxRequest({
		url: '/messages',
		method: 'GET',
		callback: function(data) {
			data = JSON.parse(data);
			
			messages.innerHTML = '';
			for (let i in data) {
				if (data.hasOwnProperty(i)) {
					var el = document.createElement('div');
					var msg = document.createElement('div');
					el.innerHTML = '<h6>' + data[i].nickname + '</h6>';
					let date = new Date(data[i].date);
					el.innerHTML += '<span class="small font-italic">' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '</span>';
					msg.innerText = data[i].content;
					el.className = 'message-box';
					el.className += ' alert';
					msg.className = 'msg';
					el.appendChild(msg);
					if (data[i].nickname == sessionStorage.getItem('user_nickname')) {
						el.className += ' toright';
						el.className += ' alert-secondary';
					}
					else {
						el.className += ' alert-warning';
					}
					messages.appendChild(el);
					
					if (data[i].content != undefined && (data[i].content).includes('@')) {
						let arr = data[i].content.split(' ');
						let recourse;
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].includes('@')) {
								recourse = arr[i].substring(1);
							}
						}
						
						if (sessionStorage.getItem('user_nickname') == recourse) {
							sayToRecourse(recourse, el);
						}
					}
				}
			}
			if (scroll == false)
				messages.scrollTop = messages.scrollHeight;
		}
	});
	ajaxRequest({
		url: '/users',
		method: 'GET',
		callback: function(data) {
			data = JSON.parse(data);
			users.innerHTML = '';
			for (let i in data) {
				if (data.hasOwnProperty(i)) {
					var el = document.createElement('div');
					el.innerHTML = '<h6>@' + data[i].nickname + "</h6>";
					el.innerHTML += "<div>Name: " + data[i].name + '</div>';
					el.className = 'user-box bg-dark';
					users.appendChild(el);
				}
			}
		}
	});
};

getData();

//////////////////////////////////////
////// UPDATING DATA /////////////////
//////////////////////////////////////
setInterval(function() {
	getData();
}, 600);
/////////////////////////////////////

//////////////////////////////////////
////////// FUNCTIONS /////////////////
//////////////////////////////////////

function ajaxRequest(options) {
	var url = options.url || '/';
	var method = options.method || 'GET';
	var callback = options.callback || function() {};
	var data = options.data || {};
	var async = options.asynchronous || true;
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.open(method, url, async);
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	xmlHttp.send(JSON.stringify(data));

	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.status == 200 && xmlHttp.readyState === 4) {
			callback(xmlHttp.responseText);
		}
	};
};

// Name validation
function userNameValidation(el) {
	if (/^[A-Za-z\s]+$/.test(el.value)){
		return true;
	}
	if (el.value.length == 0) {
		el.placeholder = 'Enter your name!';
		el.style.borderColor = 'red';
		return true;
	}
	el.placeholder = 'You can use only A-Z letters!';
	el.style.borderColor = 'red';
	return false;
}

// NickName validation
function userNickValidation(el, isInDb) {
	let is = false;
	$.ajax({
		async: false,
		url: '/users/' + el.value,
		type: 'GET',
		success: function(data) {
			isInDb = true;
			if (data != null && data.isOnline == true){
				is = true;
				el.style.borderColor = 'red';
				el.placeholder = 'This nick is already existed';
			}
		}
	});
	if (el.value.length == 0) {
		el.placeholder = 'Enter your nickname!';
		return true;
	}
	return is;
}

// Message highlightting
function sayToRecourse(name, el) {
	if (sessionStorage.getItem('user_nickname') == name.trim()) {
		el.setAttribute('style', 'background:#ffc107 !important;color:#333 !important');
	}
}