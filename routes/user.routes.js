const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { body, validationResult } = require("express-validator");
const validate = require("../middlewares/validate");
const { loginValidator } = require("../middlewares/validators");

router.post("/", controller.createUser);
router.post("/login", loginValidator, validate, controller.login);
router.get("/", controller.findAllUsers);

module.exports = router;
