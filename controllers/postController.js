const postService = require('../services/postService');

const createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body, req.userId);

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Access denied',
        });
    }
};

module.exports = { createPost };