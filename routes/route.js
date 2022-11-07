const router = require('express').Router();
const registerValidation = require('../validations/auth');
const checkAuth = require('../utils/checkAuth');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/auth/login', authController.login);
router.post('/auth/register', registerValidation, authController.register);
router.post('/auth/refresh', authController.refresh);

router.get('/auth/me', checkAuth, userController.getMe);

module.exports = router;