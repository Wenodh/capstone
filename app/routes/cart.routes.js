const authJwt = require('../middleware/authJwt');
// const controller = require('../controllers/user.controller');
const controller = require('../controllers/cart.controller');

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         'Access-Control-Allow-Headers',
    //         'x-access-token, Origin, Content-Type, Accept'
    //     );
    //     next();
    // });

    // add to cart
    app.put(
        '/api/addCart/:id',
        // authJwt.verifyToken,
        controller.updateCart
    );

    // delete cart item
    app.put(
        '/api/removeCart/:id',
        // authJwt.verifyToken,
        controller.deleteCart
    );
    // get cart
    app.get(
        '/api/Cart/:id',
        // authJwt.verifyToken,
        controller.getCardById
    );
};
