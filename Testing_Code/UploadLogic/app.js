const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './art-exhibit/');
    },
    filename: function (req, file, cb) {
        cb(null, 'image.png'); // Set the filename as "image.png"
    }
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, './art-exhibit/image.png');

    if (path.extname(req.file.originalname).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res.status(200)
                .contentType('text/plain')
                .end('File uploaded!');
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res.status(403)
                .contentType('text/plain')
                .end('Only .png files are allowed!');
        });
    }
});

function handleError(err, res) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
