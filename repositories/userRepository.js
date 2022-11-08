const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (body, hash) => {
    const user = await prisma.user.create({
        data: {
            email: body.email,
            hash_password: hash,
            first_name: body.first_name,
            last_name: body.last_name,
        },
    });

    return user;
};

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return user;
};

const findUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        }
    });

    return user;
};

const updateUser = async (id, body, hash) => {
    const updateUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            hash_password: hash
            //TODO: add other fields
        },
    });

    return updateUser;
};

const deleteUser = async (id) => {
    const deleteUser = await prisma.user.delete({
        where: {
            id: id,
        }
    });

    return deleteUser;
};

module.exports = { createUser, findUserByEmail, findUserById, updateUser, deleteUser };