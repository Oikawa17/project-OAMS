const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'main'
});

db.connect(err => {
    if (err) console.error('Database connection failed:', err);
    else console.log('Connected to MySQL');
});
// Middleware to parse FormData fields properly
const parseFormData = multer().none(); 

const application_id = "test"; // Placeholder for application ID
// Define storage with dynamic folder creation

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/'; // Single uploads folder

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const category = req.params.category; // Use category for filename
        const application_id = req.body.application_id; // Use category for filename
        const fileExtension = path.extname(file.originalname);
        cb(null, `${category}${application_id}${fileExtension}`);
    }
});

const upload = multer({ storage });

// API to upload files categorized by `application_id`
router.post('/upload/:category', upload.single('file'), (req, res) => {
    console.log("Received application_id:", req.body.application_id); // ✅ Log application ID

    const applicationId = req.body.application_id;
    const category = req.params.category;

    if (!applicationId) {
        return res.status(400).json({ message: "Application ID is missing from request." });
    }

    if (!req.file) {
        return res.status(400).json({ message: `No file uploaded for ${category}` });
    }

    const fileExtension = path.extname(req.file.originalname);
    const newFilename = `${applicationId}_${category}${fileExtension}`;
    const uploadPath = `uploads/${applicationId}/${newFilename}`;

    fs.renameSync(req.file.path, uploadPath); // Rename file correctly

 db.query(`UPDATE doc_uploaded SET ${category} = 'Submitted' WHERE application_id = ?`, [applicationId], (err) => {
    if (err) return res.status(500).json({ error: 'Database update failed' });
});
res.json({
    message: `${category} uploaded successfully!`,
    filePath: uploadPath
});
});


module.exports = router;