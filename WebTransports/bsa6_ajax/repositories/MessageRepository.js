const connection = require("../db/dbconnect");
const Repository = require("./generalRepository");
const Message = require("../models/message");

function MessageRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Message;
}

function getNumber(callback) {
  let num = this.model.count({}, function(err, count){
    console.log( "Number of users:", count );
  });
  num.exec(callback);
}

function getOneHundred(count, callback) {
  let query;
  if (count >= 100)
    query = this.model.find().skip(count - 100);
  else if (count < 100)
    query = this.model.find();
  query.exec(callback);
}

MessageRepository.prototype = new Repository();
MessageRepository.prototype.getOneHundred = getOneHundred;
MessageRepository.prototype.getNumber = getNumber;

module.exports = new MessageRepository();
