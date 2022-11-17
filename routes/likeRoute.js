const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const likeController = require('../controllers/likeController');

router.post('/:postId', checkAuth, likeController.addLike);
router.delete('/:postId', checkAuth, likeController.removeLike);

module.exports = router;