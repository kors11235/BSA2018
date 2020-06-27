const ObjectId = require('mongodb').ObjectId;

function Repository() {}

function getAll(callback) {
  this.model.find(callback);
}

function getById(id, callback) {
  this.model.findOne({_id: ObjectId(id)}, callback);
}

function create(el, callback) {
  (new this.model(el)).save(callback);
}

function update(nickname, new_data, callback) {
  this.model.updateOne({nickname: nickname}, { $set: new_data}, { new: true }, callback);
}

function deleteItem(nickname, callback) {
  this.model.findOne({nickname: nickname}).remove(callback);
}

Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.create = create;
Repository.prototype.update = update;
Repository.prototype.deleteItem = deleteItem;

module.exports = Repository;
