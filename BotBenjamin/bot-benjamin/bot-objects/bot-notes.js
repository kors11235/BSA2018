let notes = require('../../data/bot-benjamin-storage').notes;

module.exports = class BotNotes {
	constructor(message) {
		this.saveNoteRequestPattern = new RegExp(/^Save\snote\stitle:\s(.*),\sbody:\s(.*)/i);
		this.showNoteListRequestPattern = new RegExp(/^Show note list/i);
		this.showNoteRequestPattern = new RegExp(/^Show note (.*)/i);
		this.deleteNoteRequestPattern = new RegExp(/^Delete note (.*)/i);

		this.noteList = notes;

		this.answer = this.processNote(message);
	}

	processNote(message) {
		if (this.saveNoteRequestPattern.test(message)) {
			return this.processSaveNote(message);
		}
		else if (this.showNoteListRequestPattern.test(message)) {
			return this.processNoteList();
		}
		else if (this.showNoteRequestPattern.test(message)) {
			return this.processShowNote(message);
		}
		else if (this.deleteNoteRequestPattern.test(message)) {
			return this.processDeleteNote(message);
		}
		else {
			return 'Can`t imagine what you want from me';
		}
	}

	processSaveNote(message) {
		let text = (message.toLowerCase().replace('save note', '')).trim();

		let note = {
			title: text.replace(/title:\s/, '').replace(/,\sbody:\s(.*)/, '').trim().toLowerCase(),
			body: text.replace(/^title:\s(.*), body:\s/, '').trim()
		};

		this.noteList.push(note);
		return 'Your note has been saved';
	}

	processNoteList() {
		if (this.noteList.length == 0)
			return 'You don`t have any note yet';

		let data = '';
		for (let i = 0; i < this.noteList.length; i++) {
			data += '-- ' + this.noteList[i].title + '\n';
		}
		return data;
	}

	processShowNote(message) {
		let noteTitle = message.toLowerCase().replace('show note', '').trim().toLowerCase();
		let note = this.noteList.find(el => el.title.toLowerCase() == noteTitle.toLowerCase());

		if (note) { 
			return 'Title: ' + note.title + '\nBody: ' + note.body;
		} else {
			return 'Can`t find such note';
		}
	}

	processDeleteNote(message) {
		if (this.noteList.length == 0) 
			return 'You don`t have aby notes yet';
		
		let noteTitle = message.toLowerCase().replace('delete note', '').trim();
		let note = this.noteList.find(el => el.title == noteTitle);

		if (note) {
			this.noteList.splice(this.noteList.indexOf(note), 1);
			return 'Note ' + noteTitle + ' has been deleted';
		} else {
			return 'Can`t find such note';
		}
	}
}
