const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const postController = require('../controllers/postController');

router.post('/', checkAuth, postController.createPost);
router.get('/all', checkAuth, postController.getAllPosts);
router.get('/:id', checkAuth, postController.getPost);
router.get('/user/:userId', checkAuth, postController.getUserPosts);
router.put('/:id', checkAuth, postController.updatePost);
router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;