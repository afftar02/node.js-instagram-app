const commentRepository = require('../repositories/commentRepository');

const createComment = async (body, userId, postId) => {
    const data = {
        text: body.text,
        createdAt: new Date(),
        userId: +userId,
        postId: +postId,
    };

    const comment = await commentRepository.createComment(data);

    return comment;
};

const getPostComments = async (postId) => {
    const comments = await commentRepository.getPostComments(postId);

    return comments;
};

const updateComment = async (body, userId, id) => {
    const comment = await commentRepository.findCommentById(id);

    if (!comment) {
        throw new Error('Comment not found');
    }
    else if (comment?.userId !== userId) {
        throw new Error('Access denied');
    }

    const data = {
        text: body.text,
    };

    const updateComment = await commentRepository.updateComment(id, data);

    return updateComment;
};

const deleteComment = async (userId, id) => {
    const comment = await commentRepository.findCommentById(id);

    if (!comment) {
        throw new Error('Comment not found');
    }
    else if (comment?.userId !== userId) {
        throw new Error('Access denied');
    }

    const deleteComment = await commentRepository.deleteComment(id);

    return deleteComment;
};

module.exports = { createComment, getPostComments, updateComment, deleteComment };