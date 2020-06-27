const router = require("express").Router();
const messageService = require("../../services/message");
const ObjectId = require('mongodb').ObjectId;

// read all messages -- GET
router.get("/messages", (req, res) => {
  messageService.findAll((err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// read one message -- GET
router.get("/messages/:id", (req, res) => {
  messageService.findOne(req.params.id, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// create message -- POST
router.post("/messages", (req, res) => {
  let message = {
    senderId: ObjectId(req.body.senderId), 
    receiverId: ObjectId(req.body.receiverId),
    content: req.body.content
  };
  messageService.createOne(message, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// update message -- PUT
router.put("/messages/:id", (req, res) => {
  let new_data = {
    senderId: ObjectId(req.body.senderId), 
    receiverId: ObjectId(req.body.receiverId),
    content: req.body.content
  };
  messageService.updateOne(req.params.id, new_data, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// delete message -- DELETE
router.delete("/messages/:id", (req, res) => {
  messageService.deleteOne(req.params.id, (err, data) => {
		if (err)
			return res.status(500);
		res.json(data);
	});
});

module.exports = router;
