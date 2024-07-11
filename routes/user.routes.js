const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { body, validationResult } = require("express-validator");
const validate = require("../middlewares/validate");
const { loginValidator, registerValidator } = require("../middlewares/validators");

router.post("/", registerValidator, validate, controller.createUser);
router.post("/login", loginValidator, validate, controller.login);
router.get("/", controller.findAllUsers);
router.head("/", controller.headAllUsers);  
router.get("/:id", controller.findOneUser);
router.head("/:id", controller.headOneUser); 
router.delete("/:id", controller.deleteUser);
router.put("/:id", registerValidator, validate, controller.updateUser);
router.options("/", controller.optionsAllUsers); 
router.options("/:id", controller.optionsOneUser);

module.exports = router;
