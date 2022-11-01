const router = require('express').Router();
const registerValidation = require('../validations/auth');
const checkAuth = require('../utils/checkAuth');
const userController = require('../controllers/UserController');

router.post('/auth/login', userController.login);
router.post('/auth/register', registerValidation, userController.register);
router.get('/auth/me', checkAuth, userController.getMe);

module.exports = router;