const controller = require('../controllers/payment.controller');

module.exports = (app) => {
    app.post('/create/orderId', controller.createPaymentOrder);
    app.post('/api/payment/verify', controller.paymentVerify);
};
