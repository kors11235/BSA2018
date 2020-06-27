// Checks if email has been already existed
export function validateEmail(email) : boolean {
	if (localStorage.getItem('users') != null){
		let arr = JSON.parse(localStorage.getItem('users'));
		if (arr.find(el => el.email == email)) return false;
		return true;
	}
	return true;
}

// Check if the fields are empty
export function checkEmpty(el) {
	for (let i = 0; i < el.elements.length; i++) {
		if (el.elements[i].value.length == 0) return true;
	}
	return false;
}