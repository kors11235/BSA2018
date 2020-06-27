import { sayToRecourse } from './highlight-message';

// Додає повідомлення в DOM
export function addMessages(data, messages) {
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