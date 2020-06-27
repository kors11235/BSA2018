// Підсвічує повідомлення для юзера, якому воно адресоване
export function sayToRecourse(name, el) {
	if (sessionStorage.getItem('nickname') == name.trim()) {
		el.setAttribute('style', 'background:#ffc107 !important;color:#333 !important');
	}
}