const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      if (value && !value.endsWith("@gmail.com")) {
        throw new Error("Email must be from gmail.com");
      }
      return true;
    }),
  body("phonenumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("password").notEmpty().withMessage("Password is required"),
];

const registerValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("birthday").isDate().withMessage("Birthday must be a valid date"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      if (value && !value.endsWith("@gmail.com")) {
        throw new Error("Email must be from gmail.com");
      }
      return true;
    }),
  body("phonenumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { loginValidator, registerValidator };
