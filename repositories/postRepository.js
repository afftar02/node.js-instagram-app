const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPost = async (data) => {
    return post = await prisma.post.create({ data });
};

const getPost = async (id) => {
    return post = await prisma.post.findUnique({
        where: {
            id: +id,
        }
    });
};

const getCurrentUserPosts = async (userId) => {
    return posts = await prisma.post.findMany({
        where: {
            userId: +userId,
        }
    });
};

const updatePost = async (id, data) => {
    return post = await prisma.post.update({
        where: { id: +id, },
        data
    });
};

module.exports = { createPost, getPost, getCurrentUserPosts, updatePost };