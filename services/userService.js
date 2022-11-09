const userRepository = require('../repositories/userRepository');
const getHash = require('../helpers/crypt');

const getUserById = async (id) => {
    const user = await userRepository.findUserById(id);

    if (!user) {
        throw new Error('User not found');
    } else {
        return user;
    }
};

const getUserByEmail = async (email) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const createUser = async (body, hash) => {
    const data = {
        email: body.email,
        hashPassword: hash,
        firstName: body.firstName,
        lastName: body.lastName,
    };

    const user = await userRepository.createUser(data);

    if (!user) {
        throw new Error('Registration error');
    }

    return user;
};

const updateCurrentUser = async (body, userId) => {
    let hash;
    if (body.password) {
        hash = await getHash(body.password);
    }

    const data = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        hashPassword: hash
        //TODO: add other fields
    };

    const updateUser = await userRepository.updateCurrentUser(userId, data);

    if (!updateUser) {
        throw new Error('User not found');
    }

    return updateUser;
};

const deleteCurrentUser = async (userId) => {
    const deleteUser = await userRepository.deleteCurrentUser(userId);

    if (!deleteUser) {
        throw new Error('User not found');
    }

    return deleteUser;
};

module.exports = { getUserById, getUserByEmail, createUser, updateCurrentUser, deleteCurrentUser };