const infoButton = document.getElementById('botInfo'),
	  infoModal = document.getElementById('botInfoModal'),
	  infoClose = document.getElementById('closeBotHelp');

infoButton.addEventListener('click', evt => {
	infoModal.style.display = 'block';
});

infoClose.addEventListener('click', evt => {
	evt.target.parentElement.style.display = 'none';
})