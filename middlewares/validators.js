const { body } = require("express-validator");

const isNumeric = (value) => {
  if (!/^\d+$/.test(value)) {
    throw new Error("Phone number must contain only numbers");
  }
  return true;
};

const isValidPassword = (value) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(value)) {
    throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number");
  }
  return true;
};

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
    .withMessage("Invalid phone number format")
    .custom(isNumeric),
  body("password").notEmpty().withMessage("Password is required"),
];

const registerValidator = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("birthday").isDate().withMessage("Birthday must be a valid date"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      if (value && !value.endsWith("@gmail.com")) {
        throw new Error("Email must contain only gmail.com");
      }
      return true;
    }),
  body("phonenumber")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must contain only numbers")
    .custom(isNumeric),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(isValidPassword),
];

module.exports = { loginValidator, registerValidator };
