const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/user.controller');
const DonationPost = require('../controllers/donationPost.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/test/all', controller.allAccess);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

    // app.get(
    //     '/api/test/sup',
    //     [authJwt.verifyToken, authJwt.isSupervisor],
    //     controller.supervisorBoard
    // );

    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
    app.post(
        '/api/donationPost/:id',
        [authJwt.verifyToken],
        DonationPost.donationPost
    );
};
