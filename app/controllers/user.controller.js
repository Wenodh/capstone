const db = require('../models');
exports.allAccess = (req, res) => {
    res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
    res.status(200).send('Admin Content.');
};

exports.supervisorBoard = (req, res) => {
    res.status(200).send('Supervisor Content.');
};
exports.ngoBoard = (req, res) => {
    res.status(200).send('ngo Content.');
};
//get a donation post by id
exports.getUserById = async (req, res) => {
    try {
        const data = await db.user.findById({ _id: req.params.id });
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
