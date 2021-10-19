const upload = require('../middleware/upload');
const controller = require('../controllers/upload.controller');
module.exports = function (app) {
    app.post('/api/upload', upload.single('file'), controller.uploadImg);
    app.get('/file/:filename', controller.getPhoto);
};
