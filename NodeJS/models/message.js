const mongoose = require("mongoose");

// Сущность сообщения
const messageSchema = mongoose.Schema({
  senderId: String,
  receiverId: String,
  content: String
}, { versionKey: false });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
