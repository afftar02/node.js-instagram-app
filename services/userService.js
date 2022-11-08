const userRepository = require('../repositories/userRepository');

const getUserById = async (id) => {
    let success = true;

    const user = await userRepository.findUserById(id);

    if (!user) {
        success = false;
        return success;
    } else {
        return { success, user };
    }
};

const updateUser = async (body, userId) => {
    const password = body.password;
    let hash, success = true;
    if (password) {
        const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
        hash = await bcrypt.hash(password, salt);
    }

    const updateUser = await userRepository.updateUser(userId, body, hash);

    if (!updateUser) {
        success = false;
        return success;
    }

    return { success, updateUser };
};

const deleteUser = async (id) => {
    let success = true;

    const deleteUser = await userRepository.deleteUser(id);

    if (!deleteUser) {
        success = false;
        return success;
    } else {
        return { success, deleteUser };
    }
};

module.exports = { getUserById, updateUser, deleteUser };