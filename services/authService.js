const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const register = async (body) => {
    const password = body.password;
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
    const hash = await bcrypt.hash(password, salt);

    const user = await userRepository.createUser(body, hash);

    const access_token = jwt.sign(
        {
            id: user.id,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        {
            expiresIn: '7d',
        },
    );

    const refresh_token = jwt.sign(
        {
            id: user.id,
        },
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        {
            expiresIn: '30d',
        },
    );

    const { hash_password, ...userData } = user;

    return { userData, access_token, refresh_token };
};

const login = async (body) => {
    let success = true;

    const user = await userRepository.findUserByEmail(body.email);

    if (!user) {
        success = false;
        return success;
    }

    const isValidPass = await bcrypt.compare(body.password, user.hash_password);

    if (!isValidPass) {
        success = false;
        return success;
    }

    const access_token = jwt.sign(
        {
            id: user.id,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        {
            expiresIn: '7d',
        },
    );

    const refresh_token = jwt.sign(
        {
            id: user.id,
        },
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        {
            expiresIn: '30d',
        },
    );

    const { hash_password, ...userData } = user;

    return { success, userData, access_token, refresh_token };
};

const refresh = async (authorization) => {
    let success = true, refreshUserId;

    const token = (authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);

        if (decoded) {
            refreshUserId = decoded.id;
        } else {
            success = false;
            return success;
        }

    } else {
        success = false;
        return success;
    }

    const access_token = jwt.sign(
        {
            id: refreshUserId,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        {
            expiresIn: '7d',
        },
    );

    return { success, access_token };
};

module.exports = { register, login, refresh };