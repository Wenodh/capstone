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
