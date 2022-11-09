const userService = require('..//services/userService');

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        const { hashPassword, ...userData } = user;

        res.json(userData);
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: 'User not found',
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.userId);

        const { hashPassword, ...userData } = user;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Access denied',
        });
    }
};

const updateCurrentUser = async (req, res) => {
    try {
        const updateUser = await userService.updateCurrentUser(req.body, req.userId);

        const { hashPassword, ...userData } = updateUser;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Access denied',
        });
    }
};

const deleteCurrentUser = async (req, res) => {
    try {
        const deleteUser = await userService.deleteCurrentUser(req.userId);

        const { hashPassword, ...userData } = deleteUser;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Access denied',
        });
    }
};

module.exports = { getUser, getCurrentUser, updateCurrentUser, deleteCurrentUser };