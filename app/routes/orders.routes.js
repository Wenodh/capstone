const authJwt = require('../middleware/authJwt');
// const controller = require('../controllers/user.controller');
const controller = require('../controllers/orders.controller');

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         'Access-Control-Allow-Headers',
    //         'x-access-token, Origin, Content-Type, Accept'
    //     );
    //     next();
    // });

    // create order
    app.post(
        '/api/order/:id',
        // authJwt.verifyToken,
        controller.order
    );

    // get all orders
    app.get('/api/order', controller.getAllOrders);

    // // delete cart item
    // app.put(
    //     '/api/removeCart/:id',
    //     // authJwt.verifyToken,
    //     controller.deleteCart
    // );
    // // get cart
    // app.get(
    //     '/api/Cart/:id',
    //     // authJwt.verifyToken,
    //     controller.getCardById
    // );
};
