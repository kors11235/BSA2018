export function displayWritingProcess(data, isWriting, el) {
	if (isWriting == true)
		el.innerHTML = '<i class="fas fa-pen"></i> @' + data + ' is typing...';
	else
		el.innerHTML = '';
}

export function displayAllUsers(data, users) {
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
}