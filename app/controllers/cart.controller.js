const db = require('../models');

//update cart
exports.updateCart = async (req, res) => {
    try {
        const data = await db.user.findByIdAndUpdate(
            { _id: req.params.id },
            { $addToSet: { cart: req.body.postId } }
        );
        const approvedPost = await db.donationPost.findByIdAndUpdate(
            req.body.postId,
            {
                status: 'approved',
            }
        );

        // data.cart.push(res.body.postId)
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//remove on element from cart
exports.deleteCart = async (req, res) => {
    try {
        const data = await db.user.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { cart: req.body.postId } }
        );
        const approvedPost = await db.donationPost.findByIdAndUpdate(
            req.body.postId,
            {
                status: 'posted',
            }
        );
        // data.cart.push(res.body.postId)
        res.status(200).json({ success: true, data: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// get cart details
exports.getCardById = async (req, res) => {
    try {
        const data = await db.user
            .findById({ _id: req.params.id })
            .populate('cart');
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// order cart details
exports.getCardById = async (req, res) => {
    try {
        const data = await db.user
            .findById({ _id: req.params.id })
            .populate('cart');
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
