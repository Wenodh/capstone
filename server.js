const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const app = express();

// const upload = require("./app/routes/upload.routes");
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const Role = db.role;
let mongoURI = db.url;
let connection = () => {
    db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Successfully connect to MongoDB.');
            initial();
        })
        .catch((err) => {
            console.error('Connection error', err);
            process.exit();
        });
};
connection();
let gfs;
const conn = mongoose.createConnection(db.url);
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    // gfs.collection("photos");
});

//Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map((file) => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', { files: files });
        }
    });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
    //   res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist',
            });
        }

        // Files exist
        return res.json(files);
    });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            });
        }
        // File exists
        return res.json(file);
    });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            });
        }

        // Check if image
        if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
        ) {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image',
            });
        }
    });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.json({
            success: true,
        });
        // res.redirect('/');
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'server running' });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/donationPost.routes')(app);
// require('./app/routes/upload.routes')(app);
require('./app/routes/orders.routes')(app);
require('./app/routes/payments.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: 'supervisor',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'supervisor' to roles collection");
            });

            new Role({
                name: 'admin',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'admin' to roles collection");
            });
            new Role({
                name: 'ngo',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'ngo' to roles collection");
            });
        }
    });
}
