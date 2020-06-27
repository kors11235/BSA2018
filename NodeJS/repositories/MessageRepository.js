const connection = require("../db/dbconnect");
const Repository = require("./generalRepository");
const Message = require("../models/message");

function MessageRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Message;
}

MessageRepository.prototype = new Repository();

module.exports = new MessageRepository();
