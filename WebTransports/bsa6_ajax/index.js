const express = require("express");
const mongooseConnection = require("./db/dbconnect").connection;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
	
const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/api/routes")(app);
app.get('/script.js', function(req, res) {
	res.sendFile(__dirname + '/public/js/script.js');
})

const server = app.listen(8000);