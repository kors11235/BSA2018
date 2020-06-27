const path = require("path");

module.exports = (app) => {
	// Display html page
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../public/index.html'));
	});

	app.get('/css/style.css', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../public/css/style.css'));
	});

	app.get('/script.js', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../dist/main.js'));
	});

	app.get('/benjamin.png', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../public/benjamin.png'));
	});
}