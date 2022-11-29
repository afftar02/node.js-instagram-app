const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPost = async (data) => {
    return post = await prisma.post.create({ data });
};

const getPost = async (id, userId) => {
    const post = await prisma.post.findUnique({
        where: {
            id: +id,
        },
        include: {
            user: {
                include: {
                    avatar: true
                },
            },
            images: true,
        },
    });

    post.likesAmount = await prisma.usersLikedPosts.count({
        where: {
            postId: +id,
        },
    });

    const isLiked = await prisma.usersLikedPosts.findFirst({
        where: {
            postId: +id,
            userId: +userId,
        }
    });

    if (isLiked) {
        post.isLiked = true;
    } else {
        post.isLiked = false;
    }

    post.commentsAmount = await prisma.comment.count({
        where: {
            postId: +id,
        },
    });

    return post;
};

const getAllPosts = async (userId) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: {
                include: {
                    avatar: true
                },
            },
            images: true,
        },
    });

    for (const post of posts) {
        post.likesAmount = await prisma.usersLikedPosts.count({
            where: {
                postId: post.id,
            },
        });

        const isLiked = await prisma.usersLikedPosts.findFirst({
            where: {
                postId: post.id,
                userId: +userId,
            }
        });

        if (isLiked) {
            post.isLiked = true;
        } else {
            post.isLiked = false;
        }

        post.commentsAmount = await prisma.comment.count({
            where: {
                postId: post.id,
            },
        });
    }

    return posts;
};

const getUserPosts = async (userId, currentUserId) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            userId: +userId,
        },
        include: {
            user: {
                include: {
                    avatar: true
                },
            },
            images: true,
        },
    });

    for (const post of posts) {
        post.likesAmount = await prisma.usersLikedPosts.count({
            where: {
                postId: post.id,
            },
        });

        const isLiked = await prisma.usersLikedPosts.findFirst({
            where: {
                postId: post.id,
                userId: +currentUserId,
            }
        });

        if (isLiked) {
            post.isLiked = true;
        } else {
            post.isLiked = false;
        }

        post.commentsAmount = await prisma.comment.count({
            where: {
                postId: post.id,
            },
        });
    }

    return posts;
};

const updatePost = async (id, data) => {
    return post = await prisma.post.update({
        where: {
            id: +id,
        },
        data
    });
};

const deletePost = async (id) => {
    return post = await prisma.post.delete({
        where: {
            id: +id,
        },
    });
};

module.exports = { createPost, getPost, getAllPosts, getUserPosts, updatePost, deletePost };