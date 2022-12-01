const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createComment = async (data) => {
    return comment = await prisma.comment.create({ data });
};

const getPostComments = async (postId) => {
    return comments = await prisma.comment.findMany({
        where: {
            postId: +postId,
        },
        include: {
            user: {
                include: {
                    avatar: true
                },
            },
        },
    });
};

const findCommentById = async (id) => {
    return comment = await prisma.comment.findUnique({
        where: {
            id: +id,
        }
    });
};

const updateComment = async (id, data) => {
    return comment = await prisma.comment.update({
        where: {
            id: +id,
        },
        data
    });
};

const deleteComment = async (id) => {
    return comment = await prisma.comment.delete({
        where: {
            id: +id,
        }
    });
};

module.exports = { createComment, getPostComments, findCommentById, updateComment, deleteComment };