// Checks if email has been already existed
export function validateEmail(e, email) : boolean {
	let arr = JSON.parse(localStorage.getItem('users'));
	if (arr.find(el => el.email == email) && email != e) return false;
	return true;
}