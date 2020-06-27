const connection = require("../db/dbconnect");
const Repository = require("./generalRepository");
const User = require("../models/user");
const ObjectId = require('mongodb').ObjectId;

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

// Возвращает id пользователей, с которыми общался юзер
function getSendedMessages(id, callback) {
  const MessageRepository = require("../repositories/MessageRepository");
  let sended_messages = MessageRepository.model.distinct('receiverId', {senderId: ObjectId(id)}).lean();
  // let received_messages = MessageRepository.model.distinct('senderId', {receiverId: ObjectId(id)}).lean();

  sended_messages.exec(callback);
}

// Возвращает пользователей, с которыми общался юзер
function getInterlocutors(data, callback) {
  let query = this.model.find({_id: {$in: data}});
  query.exec(callback);
}

UserRepository.prototype = new Repository();
UserRepository.prototype.getSendedMessages = getSendedMessages;
UserRepository.prototype.getInterlocutors = getInterlocutors;

module.exports = new UserRepository();
