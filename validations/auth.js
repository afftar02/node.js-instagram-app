const { body } = require('express-validator');

const registerValidation = [
    body('email','Incorrect email format').isEmail(),
    body('password', 'Password length at least 5 characters').isLength({ min: 5 }),
    body('first_name',"First name can't be empty").isLength({ min: 3 }),
    body('last_name',"First name can't be empty").isLength({ min: 3 }),
];

module.exports = registerValidation;