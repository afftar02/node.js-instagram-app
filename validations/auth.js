const { body } = require('express-validator');

const registerValidation = [
    body('email','Incorrect email format').isEmail(),
    body('password', 'Password length at least 5 characters').isLength({ min: 5 }),
    body('first_name',"First name length at least 3 characters").isLength({ min: 3 }),
    body('last_name',"Last name length at least 3 characters").isLength({ min: 3 }),
];

module.exports = registerValidation;