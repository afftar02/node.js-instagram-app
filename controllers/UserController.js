const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
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

const updateUser = async (req, res) => {
    try {
        if (Number(req.params.id) !== req.userId) {
            return res.status(500).json({
                message: 'Access denied',
            });
        }

        const password = req.body.password;
        let hash;
        if (password) {
            const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
            hash = await bcrypt.hash(password, salt);
        }

        const updateUser = await prisma.user.update({
            where: {
                id: req.userId,
            },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                hash_password: hash
                //TODO: add other fields
            },
        });

        if (!updateUser) {
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

        const deleteUser = await prisma.user.delete({
            where: {
                id: req.userId,
            }
        });

        if (!deleteUser) {
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