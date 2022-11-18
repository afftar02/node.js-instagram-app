const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const commentController = require('../controllers/commentController');

router.post('/:postId', checkAuth, commentController.createComment);
router.get('/:postId', checkAuth, commentController.getPostComments);
router.put('/:id', checkAuth, commentController.updateComment);
router.delete('/:id', checkAuth, commentController.deleteComment);

module.exports = router;