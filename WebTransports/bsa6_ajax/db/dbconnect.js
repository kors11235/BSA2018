function dbConnectionHandler() {
  const mongoose = require("mongoose");
  const config = require("../config/index");
  mongoose.connect(config.uri, config.opts);

  mongoose.set("debug", true);

  this.connection = mongoose.connection;

  mongoose.connection.on("connected", function() {
    this.state = "connected";
    console.log('Connected on *8000');
  });

  mongoose.connection.on("error", function(err) {
    this.state = "disconnected";
  });

  mongoose.connection.on("disconnected", function() {
    this.state = "disconnected";
    console.log('Disonnected on *8000');
  });
}

module.exports = new dbConnectionHandler();
