const { body } = require('express-validator');

const emailMessage = 'Incorrect email format';
const passwordMessage = 'Password length at least 5 characters';
const firstNameMessage = 'First name length at least 3 characters';
const lastNameMessage = 'Last name length at least 3 characters';

const registerValidation = [
    body('email', emailMessage).isEmail(),
    body('password', passwordMessage).isLength({ min: 5, max: 25 }),
    body('firstName', firstNameMessage).isLength({ min: 3, max: 25 }),
    body('lastName', lastNameMessage).isLength({ min: 3, max: 25 }),
];

module.exports = registerValidation;