const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getHash = require('../helpers/crypt');
const userService = require('./userService');

const accessTokenKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const accessTokenLifetime = process.env.ACCESS_TOKEN_LIFETIME;
const refreshTokenLifetime = process.env.REFRESH_TOKEN_LIFETIME;

const register = async (body) => {
    const hash = await getHash(body.password);

    const user = await userService.createUser(body, hash);

    const accessToken = jwt.sign(
        { id: user.id },
        accessTokenKey,
        { expiresIn: accessTokenLifetime },
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        refreshTokenKey,
        { expiresIn: refreshTokenLifetime },
    );

    return { accessToken, refreshToken };
};

const login = async (body) => {
    const user = await userService.getUserByEmail(body.email);

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const isValidPass = await bcrypt.compare(body.password, user.hashPassword);

    if (!isValidPass) {
        throw new Error('Incorrect email or password');
    }

    const accessToken = jwt.sign(
        { id: user.id },
        accessTokenKey,
        { expiresIn: accessTokenLifetime },
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        refreshTokenKey,
        { expiresIn: refreshTokenLifetime },
    );

    return { accessToken, refreshToken };
};

const refresh = async (authorization) => {
    let refreshUserId;

    const token = (authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        const decoded = jwt.verify(token, refreshTokenKey);

        if (decoded) {
            refreshUserId = decoded.id;
        } else {
            throw new Error('Token is not valid');
        }

    } else {
        throw new Error('Token is not valid');
    }

    const accessToken = jwt.sign(
        { id: refreshUserId },
        accessTokenKey,
        { expiresIn: accessTokenLifetime },
    );

    return accessToken;
};

module.exports = { register, login, refresh };