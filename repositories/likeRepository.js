const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addLike = async (data) => {
    await prisma.usersLikedPosts.create({ data });
};

const getLikesAmount = async (postId) => {
    const likes = await prisma.usersLikedPosts.findMany({
        where: {
            postId: +postId,
        },
    });

    return likes.length;
};

const removeLike = async (data) => {
    await prisma.usersLikedPosts.deleteMany({
        where: { ...data },
    });
};

module.exports = { addLike, getLikesAmount, removeLike };