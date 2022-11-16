const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const postController = require('../controllers/postController');

router.post('/', checkAuth, postController.createPost);


module.exports = router;