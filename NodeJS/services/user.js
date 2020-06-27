const UserRepository = require("../repositories/UserRepository");

module.exports = {
  findAll: callback => {
    UserRepository.getAll((err, data) => {
      callback(null, data);
    });
  },

  findOne: (id, callback) => {
    UserRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },

  createOne: (user, callback) => {
  	UserRepository.create(user, (err, data) => {
      callback(err, data);
    })
  },

  updateOne: (id, user, callback) => {
    UserRepository.update(id, user, (err, data) => {
      callback(err, data);
    })
  },

  deleteOne: (id, callback) => {
    UserRepository.deleteItem(id, (err, data) => {
      callback(err, data);
    })
  },

  findSendedMessages: (id, callback) => {
    UserRepository.getSendedMessages(id, (err, data) => {
      UserRepository.getInterlocutors(data, (err, data2) => {
        callback(err, data2);
      })
    })
  },

  findInterlocutors: (data, callback) => {
    UserRepository.getInterlocutors(data, (err, data2) => {
      callback(err, data2);
    })
  }
};
