const db = require('../models');
const DonationPost = db.donationPost;
exports.donationPost = (req, res) => {
    const donationPost = new DonationPost({
        title: req.body.title,
        description: req.body.description,
        phone: req.body.phone,
        address: req.body.address,
    });

    donationPost.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            res.send({ message: 'donation Post was created' });
        }
    });
    // .then(function (db.donationPost) {
    //     // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
    //     // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
    //     // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //     return db.user.findOneAndUpdate(
    //         { _id: req.params.id },
    //         { $push: { donationPost: donationPost._id } },
    //         { new: true }
    //     );
    // })
    // .then(function (user) {
    //     // If we were able to successfully update a Product, send it back to the client
    //     res.json(user);
    // })
    // .catch(function (err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    // });
};
