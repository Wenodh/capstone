const authJwt = require('../middleware/authJwt');
// const controller = require('../controllers/user.controller');
const controller = require('../controllers/admin.controller');

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         'Access-Control-Allow-Headers',
    //         'x-access-token, Origin, Content-Type, Accept'
    //     );
    //     next();
    // });

    //all donation posts
    app.get(
        '/api/admin/approval',
        // authJwt.verifyToken,
        controller.getAllDonationPostForApproval
    );

    app.put(
        '/api/admin/approval',
        // authJwt.verifyToken,
        controller.sendDelivery
    );
    //create donation post
    // app.post(
    //     '/api/donationPost/:id',
    //     // authJwt.verifyToken,
    //     controller.donationPost
    // );

    // //todo: pending
    // app.get(
    //     '/api/getAllDonationPostByUserId/:id',
    //     // authJwt.verifyToken,
    //     controller.getAllDonationPostByUserId
    // );

    // //update
    // app.put(
    //     '/api/donationPost/:id',
    //     // authJwt.verifyToken,
    //     controller.updateDonationPost
    // );

    // //delete
    // app.delete(
    //     '/api/donationPost/:id',
    //     // authJwt.verifyToken,
    //     controller.deleteDonationPost
    // );

    // //get a donation post by id
    // app.get(
    //     '/api/donationPost/:id',
    //     // authJwt.verifyToken,
    //     controller.getDonationPost
    // );
};
