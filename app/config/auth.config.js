require('dotenv').config();
module.exports = {
    secret: process.env.SECRETE,
    jwtExpiration: process.env.JWTEXPIRATION,
    jwtRefreshExpiration: process.env.JWTREFRESHEXPIRATION,
};
