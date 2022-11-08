const router = require('express').Router();
const checkAuth = require('../utils/checkAuth');
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.put('/:id', checkAuth, userController.updateUser);
router.delete('/:id', checkAuth, userController.deleteUser);

module.exports = router;