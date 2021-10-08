require('dotenv').config();
module.exports = {
    url: `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@sandbox.wrvbj.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
};
//     HOST: 'localhost',
//     PORT: 27017,
//     DB: 'capstone',
