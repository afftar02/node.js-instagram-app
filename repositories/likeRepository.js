const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addLike = async (data) => {
    await prisma.usersLikedPosts.create({ data });
};

const removeLike = async (data) => {
    await prisma.usersLikedPosts.deleteMany({
        where: { ...data },
    });
};

const getLikesAmount = async (postId) => {
    return likesAmount = await prisma.usersLikedPosts.count({
        where: {
            postId: +postId,
        },
    });
};

module.exports = { addLike, removeLike, getLikesAmount };