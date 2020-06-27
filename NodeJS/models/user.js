const mongoose = require("mongoose");

// Сущность пользователя
const userSchema = mongoose.Schema({
  name: String,
  nickname: String
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;
