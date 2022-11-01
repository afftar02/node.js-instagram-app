const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        description: String,
        location: String,
        avatarUrl: String,
        headerImageUrl: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', UserSchema);