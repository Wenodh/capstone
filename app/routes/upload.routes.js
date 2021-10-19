// const upload = require('../middleware/upload');
// const controller = require('../controllers/upload.controller');
// module.exports = function (app) {
//     app.post('/api/upload', upload.single('file'), controller.uploadImg);
//     app.get('/file/:filename', controller.getPhoto);
// };


const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const homeController = require("../controllers/home.controller");
// const uploadController = require("../controllers/upload.controller");

// let routes = app => {
// //   router.get("/api/", homeController.getHome);

//   router.post("/upload", uploadController.uploadFile);

//   return app.use("/", router);
// };

// module.exports = routes;