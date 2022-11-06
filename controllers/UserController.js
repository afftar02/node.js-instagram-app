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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                hash_password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            },
        });

        const token = jwt.sign(
            {
                id: user.id,
            },
            'secret2022',
            {
                expiresIn: '30d',
            },
        );

        const { hash_password, ...userData } = user;

        res.json({
            ...userData,
            token,
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

        const token = jwt.sign(
            {
                id: user.id,
            },
            'secret2022',
            {
                expiresIn: '30d',
            },
        );

        const { hash_password, ...userData } = user;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Authorization error',
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { hash_password, ...userData } = user;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access denied',
        });
    }
};

module.exports = { register, login, getMe };