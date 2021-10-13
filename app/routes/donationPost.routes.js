const authJwt = require('../middleware/authJwt');
// const controller = require('../controllers/user.controller');
const controller = require('../controllers/donationPost.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    //all donation posts
    app.get(
        '/api/donationPost',
        authJwt.verifyToken,
        controller.getAllDonationPost
    );

    //create donation post
    app.post(
        '/api/donationPost/:id',
        authJwt.verifyToken,
        controller.donationPost
    );

    //todo: pending
    app.get(
        '/api/getAllDonationPostByUserId/:id',
        authJwt.verifyToken,
        controller.getAllDonationPostByUserId
    );

    //update
    app.put(
        '/api/donationPost/:id',
        authJwt.verifyToken,
        controller.updateDonationPost
    );

    //delete
    app.delete(
        '/api/donationPost/:id',
        authJwt.verifyToken,
        controller.deleteDonationPost
    );
};
