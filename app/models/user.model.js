const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: Number,
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DonationPost',
            },
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        donationPost: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DonationPost',
            },
        ],
    })
);

module.exports = User;
