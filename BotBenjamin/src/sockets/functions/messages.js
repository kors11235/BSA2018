import { addMessages } from '../../functions/add-messages';
import {scroll } from '../../global-vars';

export function displayAllMessages(data, messages) {
	messages.innerHTML = '';
	data.sort(function(a, b) {
		return new Date(b.date) - new Date(a.date);
	});
	if (data.length >= 10) {
		for (let i = 99; i >= 0; i--) {
			if (data.hasOwnProperty(i)) {
				addMessages(data[i], messages);
			}
		}
	}
	else {
		for (let i = data.length-1; i >= 0; i--) {
			if (data.hasOwnProperty(i)) {
				addMessages(data[i], messages);
			}
		}
	}
	if (scroll == false)
		messages.scrollTop = messages.scrollHeight;
}

export function newMessage(data, messages) {
	addMessages(data, messages);
	if (scroll == false)
		messages.scrollTop = messages.scrollHeight;
}