const db = require('../models');

//create cart
exports.order = async (req, res) => {
    try {
        const data = await db.user.findById(req.params.id);
        const d = data.cart;
        const newOrder = new db.orders({
            orderedBy: req.params.id,
            orderItems: d,
        });
        await newOrder.save();
        await data.updateOne(
            
            { $push: { orders: newOrder._id } },
            { multi: true }
        );
        const data11 = await db.user.findByIdAndUpdate(req.params.id,{ $set: { cart: [] } })
       
        const data2 = await db.orders.find(newOrder._id);
        res.status(200).json({ data2 });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const data = await db.orders
            .find({})
            .populate('orderItems')
            .populate(
                'orderedBy',
                '-password -_id -cart -roles -donationPost -__v -orders'
            );
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// //remove on element from cart
// exports.deleteCart = async (req, res) => {
//     try {
//         const data = await db.user.findByIdAndUpdate(
//             { _id: req.params.id },
//             { $pull: { cart: req.body.postId } }
//         );
//         const approvedPost = await db.donationPost.findByIdAndUpdate(
//             req.body.postId,
//             {
//                 status: 'posted',
//             }
//         );
//         // data.cart.push(res.body.postId)
//         res.status(200).json({ success: true, data: data });
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

// // get cart details
// exports.getCardById = async (req, res) => {
//     try {
//         const data = await db.user
//             .findById({ _id: req.params.id })
//             .populate('cart');
//         res.status(200).json({ success: true, data });
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };
