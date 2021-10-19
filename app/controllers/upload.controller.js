exports.uploadImg = async (req, res) => {
    try {
        if (req.file === undefined) return res.send('you must select a file.');
        const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
        return res.send(imgUrl);
        // res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getPhoto = async (req, res) => {
    try {
        const file = await gfs.files.findOne({
            filename: req.params.filename,
        });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send('not found');
    }
};
