const express = require('express');
const multer = require('multer');
const db = require('../sqlite/db');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', (req, res) => {
    
});

router.post('/', upload.single('file') ,(req, res) => {
    const uploadedFile = req.file;
    db.insertFileIntoDb(uploadedFile.filename);

    const data = {
        name: uploadedFile.filename,
        mimetype: uploadedFile.mimetype,
        size: uploadedFile.size
    }

    res.status(200).json({
        status: true,
        message: 'File uploaded',
        data: data
    });
});

router.delete('/:fileName', async (req, res) => {
    let uploadedFiles = await new Promise((resolve, reject) => {
        fs.readdir('../rkl-node/uploads', (error, files) => {
            if(error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
    const fileName = req.params.fileName;
    if (uploadedFiles.includes(fileName)) {
        db.delete(fileName);
        fs.unlink(`./uploads/${fileName}`, (error) => {if (error) console.log(error)});
    }
    res.status(200).json('File deleted successfuly');
});

module.exports = router;