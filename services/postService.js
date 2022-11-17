const postRepository = require('../repositories/postRepository');

const createPost = async (body, userId) => {
    const data = {
        description: body.description,
        createdAt: new Date(),
        userId: userId
    };

    const post = await postRepository.createPost(data);

    if (!post) {
        throw new Error('Post creation failed');
    }

    return post;
};

const getPost = async (id) => {
    const post = await postRepository.getPost(id);

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};

const getUserPosts = async (userId) => {
    const posts = await postRepository.getUserPosts(userId);

    if (!posts) {
        throw new Error('Posts not found');
    }

    return posts;
};

const updatePost = async (body, userId, postId) => {
    const post = await postRepository.getPost(postId);

    if(post.userId !== userId) {
        throw new Error('Access denied');
    }

    const data = {
        description: body.description
    };

    const updatePost = await postRepository.updatePost(postId, data);

    if (!updatePost) {
        throw new Error('Post update failed');
    }

    return updatePost;
};

const deletePost = async (userId, postId) => {
    const post = await postRepository.getPost(postId);

    if(post.userId !== userId) {
        throw new Error('Access denied');
    }

    const deletePost = await postRepository.deletePost(postId);

    if (!deletePost) {
        throw new Error('Post delete failed');
    }

    return deletePost;
};

module.exports = { createPost, getPost, getUserPosts, updatePost, deletePost };