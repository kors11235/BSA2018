const mongoose = require("mongoose");

// Сущность сообщения
const messageSchema = mongoose.Schema({
  nickname: String,
  content: String,
  date: Date
}, { versionKey: false });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
