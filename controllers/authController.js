const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { accessToken, refreshToken } = await authService.register(req.body);

        res.json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Registration error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { accessToken, refreshToken } = await authService.login(req.body);

        res.json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Incorrect email or password',
        });
    }
};

const refresh = async (req, res) => {
    try {
        const accessToken = await authService.refresh(req.headers.authorization);

        res.json({ accessToken });
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Access denied',
        });
    }
};

module.exports = { register, login, refresh };