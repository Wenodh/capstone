require('dotenv').config();
module.exports = {
    secret: process.env.SECRETE,
    jwtExpiration: 3600,
    jwtRefreshExpiration: 84600,
};
