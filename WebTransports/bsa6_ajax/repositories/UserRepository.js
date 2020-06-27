const connection = require("../db/dbconnect");
const Repository = require("./generalRepository");
const User = require("../models/user");
const ObjectId = require('mongodb').ObjectId;

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

// Get online users
function getOnline(callback) {
  let query = this.model.find({isOnline: true});
  query.exec(callback);
}

function getByNickname(nickname, callback) {
  this.model.findOne({nickname: nickname}, callback);
}

UserRepository.prototype = new Repository();
UserRepository.prototype.getOnline = getOnline;
UserRepository.prototype.getByNickname = getByNickname;

module.exports = new UserRepository();
