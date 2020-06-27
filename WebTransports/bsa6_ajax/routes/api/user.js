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
router.get("/users/:nickname", (req, res) => {
  userService.findOne(req.params.nickname, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// create user -- POST
router.post("/users", (req, res) => {
  let user = {
    name: req.body.name, nickname: req.body.nickname, isOnline: true
  };
  userService.createOne(user, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// update user -- PUT
router.put("/users/:nickname", (req, res) => {
  let new_data = {
    name: req.body.name, isOnline: req.body.isOnline
  };
  userService.updateOne(req.params.nickname, new_data, (err, data) => {
    if (err)
      return res.status(400);
    res.json(data);
  });
});

// delete user -- DELETE
router.delete("/users/:nickname", (req, res) => {
  userService.deleteOne(req.params.nickname, (err, data) => {
		if (err)
			return res.status(500);
		res.json(data);
	});
});

module.exports = router;
