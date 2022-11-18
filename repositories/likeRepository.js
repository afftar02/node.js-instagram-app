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

module.exports = { addLike, removeLike };