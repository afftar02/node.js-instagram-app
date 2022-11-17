const likeRepository = require('../repositories/likeRepository');

const addLike = async (userId, postId) => {
    const data = {
        userId: +userId,
        postId: +postId,
    };

    await likeRepository.addLike(data);

    const likesAmount = await likeRepository.getLikesAmount(postId);

    return likesAmount;
};

module.exports = { addLike };