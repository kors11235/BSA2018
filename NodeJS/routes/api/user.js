const router = require("express").Router();
const userService = require("../../services/user");

// read all users -- GET
router.get("/users", (req, res) => {
  userService.findAll((err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// read one user -- GET
router.get("/users/:id", (req, res) => {
  userService.findOne(req.params.id, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// create user -- POST
router.post("/users", (req, res) => {
  let user = {
    name: req.body.name, nickname: req.body.nickname
  };
  userService.createOne(user, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// update user -- PUT
router.put("/users/:id", (req, res) => {
  let new_data = {
    name: req.body.name, nickname: req.body.nickname
  };
  userService.updateOne(req.params.id, new_data, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// delete user -- DELETE
router.delete("/users/:id", (req, res) => {
  userService.deleteOne(req.params.id, (err, data) => {
		if (err)
			return res.status(500);
		res.json(data);
	});
});

// возвращает всех пользователей, с которыми общался пользователь с данным id
router.get("/users/:id/interlocutors", (req, res) => {
  userService.findSendedMessages(req.params.id, (err, data) => {
    if (err)
      return res.status(400);
      res.json(data);
  });
});

module.exports = router;
