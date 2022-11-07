const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
        const hash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                hash_password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            },
        });

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
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: 'Incorrect email or password',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.hash_password);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Incorrect email or password',
            });
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

        res.json({
            ...userData,
            access_token,
            refresh_token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Authorization error',
        });
    }
};

const refresh = async (req, res) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (token) {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);

            if (decoded) {
                req.refreshUserId = decoded.id;
            } else {
                return res.status(401).json({
                    message: 'Access denied',
                });
            }

        } else {
            return res.status(401).json({
                message: 'Access denied',
            });
        }

        const access_token = jwt.sign(
            {
                id: req.refreshUserId,
            },
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            {
                expiresIn: '7d',
            },
        );

        res.json({
            access_token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Refreshing error',
        });
    }
};

module.exports = { register, login, refresh };