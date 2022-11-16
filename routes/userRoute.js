const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const userController = require('../controllers/userController');

router.get('/:id',checkAuth, userController.getUser);
router.get('/', checkAuth, userController.getCurrentUser);
router.put('/', checkAuth, userController.updateCurrentUser);
router.delete('/', checkAuth, userController.deleteCurrentUser);

module.exports = router;