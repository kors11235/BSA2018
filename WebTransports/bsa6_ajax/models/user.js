const mongoose = require("mongoose");

// Сущность пользователя
const userSchema = mongoose.Schema({
  name: String,
  nickname: String,
  isOnline: Boolean
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;
