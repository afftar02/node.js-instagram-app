const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const likeController = require('../controllers/likeController');

router.post('/:postId', checkAuth, likeController.addLike);

module.exports = router;