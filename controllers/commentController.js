const commentService = require('../services/commentService');

const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body, req.userId, req.params.postId);

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Post not found',
        });
    }
};

const getPostComments = async (req, res) => {
    try {
        const comments = await commentService.getPostComments(req.params.postId);

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Post not found',
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const updateComment = await commentService.updateComment(req.body, req.userId, req.params.id);

        res.json(updateComment);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: `${err}`,
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const deleteComment = await commentService.deleteComment(req.userId, req.params.id);

        res.json(deleteComment);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: `${err}`,
        });
    }
};

module.exports = { createComment, getPostComments, updateComment, deleteComment };