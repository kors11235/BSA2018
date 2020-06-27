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

function update(id, new_data, callback) {
  this.model.findByIdAndUpdate(ObjectId(id), { $set: new_data}, { new: true }, callback);
}

function deleteItem(id, callback) {
  this.model.findOne({_id: ObjectId(id)}).remove(callback);
}

Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.create = create;
Repository.prototype.update = update;
Repository.prototype.deleteItem = deleteItem;

module.exports = Repository;
