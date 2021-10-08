require('dotenv').config();
module.exports = {
    secret: 'sample-secret-key',
    jwtExpiration: process.env.JWTEXPIRATION,
    jwtRefreshExpiration: process.env.JWTREFRESHEXPIRATION,
};
