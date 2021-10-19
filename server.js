const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');
const app = express();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
var mongo = require('mongodb');
const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const Role = db.role;

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

// let gfs;
// const conn = mongoose.createConnection(db.url);
// conn.once('open', function () {
//     gfs = Grid(conn.db, mongo);
//     gfs.collection('photos');
// });

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'server running' });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/donationPost.routes')(app);
require('./app/routes/upload.routes')(app);

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
