import { body } from "express-validator";

export const registerValidation = [
    body('email','Incorrect email format').isEmail(),
    body('password', 'Password length at least 5 characters').isLength({ min: 5 }),
    body('name',"Name can't be empty").isLength({ min: 3 }),
];