const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.post("/", controller.createUser);
router.post("/login", controller.login);
router.get("/", controller.findAllUsers);

module.exports = router;
