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

const removeLike = async (userId, postId) => {
    const data = {
        userId: +userId,
        postId: +postId,
    };

    await likeRepository.removeLike(data);

    const likesAmount = await likeRepository.getLikesAmount(postId);

    return likesAmount;
};

const getLikesAmount = async (postId) => {
    const likesAmount = await likeRepository.getLikesAmount(postId);

    return likesAmount;
};

module.exports = { addLike, removeLike, getLikesAmount };