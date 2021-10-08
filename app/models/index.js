const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.refreshToken = require('./refreshToken.model');
db.donationPost = require('./donationPost.model');

db.ROLES = ['user', 'admin', 'supervisor'];

module.exports = db;
