const UserRepository = require("../repositories/UserRepository");

module.exports = {
  findAll: callback => {
    UserRepository.getAll((err, data) => {
      callback(null, data);
    });
  },

  findOne: (nickname, callback) => {
    UserRepository.getByNickname(nickname, (err, data) => {
      callback(err, data);
    });
  },

  createOne: (user, callback) => {
  	UserRepository.create(user, (err, data) => {
      callback(err, data);
    })
  },

  updateOne: (nickname, user, callback) => {
    UserRepository.update(nickname, user, (err, data) => {
      callback(err, data);
    })
  },

  deleteOne: (nickname, callback) => {
    UserRepository.deleteItem(nickname, (err, data) => {
      callback(err, data);
    })
  },

  findOnline: (callback) => {
    UserRepository.getOnline((err, data2) => {
      callback(err, data2);
    })
  }
};
