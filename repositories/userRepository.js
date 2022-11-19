const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (data) => {
    return user = await prisma.user.create({ data });
};

const findUserByEmail = async (email) => {
    return user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            avatar: true,
        }
    });
};

const findUserById = async (id) => {
    return user = await prisma.user.findUnique({
        where: {
            id: +id,
        },
        include: {
            avatar: true,
        }
    });
};

const updateCurrentUser = async (id, data) => {
    return updateUser = await prisma.user.update({
        where: {
            id: id,
        },
        data
    });
};

const deleteCurrentUser = async (id) => {
    return deleteUser = await prisma.user.delete({
        where: {
            id: id,
        }
    });
};

module.exports = { createUser, findUserByEmail, findUserById, updateCurrentUser, deleteCurrentUser };