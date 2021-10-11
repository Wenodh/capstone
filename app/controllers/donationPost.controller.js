const db = require('../models');

const DonationPost = db.donationPost;
exports.donationPost = async (req, res, next) => {
    try {
        const donationPost = new DonationPost(req.body);
        donationPost.postedBy = req.params.id;
        await donationPost.save();
        const user = await db.user.findById({ _id: req.params.id });
        user.donationPost.push(donationPost._id);
        await user.save();
        res.status(200).json({ success: true, data: donationPost });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.getAllDonationPost = async (req, res) => {
    try {
        const data = await db.donationPost.find();
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.getAllDonationPostByUserId = async (req, res) => {
    try {
        const data = await db.user.find({ _id: req.params.id }).populate({
            path: 'User',
            select: 'DonationPost',
        });
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
