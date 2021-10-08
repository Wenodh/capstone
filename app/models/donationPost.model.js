const mongoose = require('mongoose');

const DonationPost = mongoose.model(
    'DonationPost',
    new mongoose.Schema(
        {
            title: String,
            description: String,
            phone: String,
            address: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            status: {
                type: String,
                enum: ['posted', 'approved', 'delivered'],
                default: 'posted',
            },
        },
        {
            timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
        }
    )
);

module.exports = DonationPost;
