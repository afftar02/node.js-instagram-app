const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const userService = require('..//services/userService');

const prisma = new PrismaClient();

const getUser = async (req, res) => {
    try {
        const { success, user } = await userService.getUserById(req.params.id);

        if (success) {
            const { hash_password, ...userData } = user;

            res.json(userData);
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access denied',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        if (Number(req.params.id) !== req.userId) {
            return res.status(500).json({
                message: 'Access denied',
            });
        }

        const { success, updateUser } = await userService.updateUser(req.body, req.userId);

        if (!success) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { hash_password, ...userData } = updateUser;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access denied',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (Number(req.params.id) !== req.userId) {
            return res.status(500).json({
                message: 'Access denied',
            });
        }

        const { success, deleteUser } = await userService.deleteUser(req.userId);

        if (!success) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { hash_password, ...userData } = deleteUser;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Access denied',
        });
    }
};

module.exports = { getUser, updateUser, deleteUser };