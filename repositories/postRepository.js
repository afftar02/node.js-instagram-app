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

const getUserPosts = async (userId) => {
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

const deletePost = async (id) => {
    return post = await prisma.post.delete({
        where: { id: +id, },
    });
};

module.exports = { createPost, getPost, getUserPosts, updatePost, deletePost };