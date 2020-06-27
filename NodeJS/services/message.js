const MessageRepository = require("../repositories/MessageRepository");

module.exports = {
  findAll: callback => {
    MessageRepository.getAll((err, data) => {
      callback(null, data);
    });
  },

  findOne: (id, callback) => {
    MessageRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },

  createOne: (user, callback) => {
  	MessageRepository.create(user, (err, data) => {
      callback(err, data);
    })
  },

  updateOne: (id, user, callback) => {
    MessageRepository.update(id, user, (err, data) => {
      callback(err, data);
    })
  },

  deleteOne: (id, callback) => {
    MessageRepository.deleteItem(id, (err, data) => {
      callback(err, data);
    })
  }
};
