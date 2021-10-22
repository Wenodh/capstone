const Razorpay = require('razorpay');

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.createPaymentOrder = (req, res) => {
     let options = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: shortid.generate(),
        payment_capture: 1,
    };
    instance.orders.create(options, (err, order) => {
        // console.log(order);
        res.json(order);
    });
}

exports.paymentVerify = (req, res) => {
    let body =
        req.body.response.razorpay_order_id +
        '|' +
        req.body.response.razorpay_payment_id;
    let crypto = require('crypto');
    let expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log('sig received ', req.body.response.razorpay_signature);
    console.log('sig generated ', expectedSignature);
    let response = { signatureIsValid: 'false' };
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { signatureIsValid: 'true' };
    res.send(response);
}

