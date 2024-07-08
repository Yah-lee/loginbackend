const { body } = require('express-validator');

const loginValidator = [
  body('emailandphonenumer').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { loginValidator };
