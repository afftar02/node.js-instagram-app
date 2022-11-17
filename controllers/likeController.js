const likeService = require('../services/likeService');

const addLike = async (req, res) => {
    try {
        const likesAmount = await likeService.addLike(req.userId, req.params.postId);

        res.json(likesAmount);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Access denied',
        });
    }
};

module.exports = { addLike };