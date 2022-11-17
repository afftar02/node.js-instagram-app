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

module.exports = { addLike, getLikesAmount };