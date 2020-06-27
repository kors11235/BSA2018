const MessageRepository = require("../repositories/MessageRepository");

module.exports = {
  findOneHundred: callback => {
    MessageRepository.getNumber((err, count) => {
      MessageRepository.getOneHundred(count, (err, data) => {
        callback(err, data);
      });
    })
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
  }
};
