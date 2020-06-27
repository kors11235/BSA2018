const router = require("express").Router();
const messageService = require("../../services/message");
const ObjectId = require('mongodb').ObjectId;

// read all messages -- GET
router.get("/messages", (req, res) => {
  messageService.findOneHundred((err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// create message -- POST
router.post("/messages", (req, res) => {
  let message = {
    nickname: req.body.nickname, 
    content: req.body.content,
    date: new Date()
  };
  messageService.createOne(message, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

module.exports = router;
