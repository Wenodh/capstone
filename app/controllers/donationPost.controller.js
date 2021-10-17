const db = require('../models');
//collection
const DonationPost = db.donationPost;

//create post
exports.donationPost = async (req, res) => {
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

//update DonationPost
exports.updateDonationPost = async (req, res) => {
    try {
        const donationPost = await DonationPost.findById(req.params.id);
        const currentUser = req.body.postedBy;
        if (currentUser === donationPost.postedBy.toString()) {
            await donationPost.updateOne({ $set: req.body });
            res.status(200).json({
                success: true,
                message: 'Donation post updated',
            });
        } else {
            res.status(403).json('you can update only your post');
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//delete DonationPost
exports.deleteDonationPost = async (req, res) => {
    try {
        const donationPost = await DonationPost.findById(req.params.id);
        const currentUser = await db.user.findById({
            _id: donationPost.postedBy.toString(),
        });
        // console.log(currentUser);
        // console.log(donationPost);
        await currentUser.updateOne({ $pull: { donationPost: req.params.id } });
        await donationPost.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Donation post deleted',
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//get a donation post by id
exports.getDonationPost = async (req, res) => {
    try {
        const data = await db.donationPost.findById(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getAllDonationPost = async (req, res) => {
    try {
        const data = await db.donationPost.find().sort({ timestamp: -1 });
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// todo : under development
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
