const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPost = async (data) => {
    return post = await prisma.post.create({ data });
};

module.exports = { createPost };