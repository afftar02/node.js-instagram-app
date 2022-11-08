const router = require('express').Router();
const registerValidation = require('../validations/auth');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', registerValidation, authController.register);
router.post('/refresh', authController.refresh);

module.exports = router;