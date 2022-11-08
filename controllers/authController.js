const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { userData, access_token, refresh_token } = await authService.register(req.body);

        res.json({
            ...userData,
            access_token,
            refresh_token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Registration error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { success, userData, access_token, refresh_token } = await authService.login(req.body);

        if (success) {
            res.json({
                ...userData,
                access_token,
                refresh_token
            });
        } else {
            return res.status(400).json({
                message: 'Incorrect email or password',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Authorization error',
        });
    }
};

const refresh = async (req, res) => {
    try {
        const { success, access_token } = await authService.refresh(req.headers.authorization);

        if (success) {
            res.json({
                access_token
            });
        } else {
            return res.status(401).json({
                message: 'Access denied',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Refreshing error',
        });
    }
};

module.exports = { register, login, refresh };