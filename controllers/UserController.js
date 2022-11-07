const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

module.exports = { getMe };