const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'main'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

router.post('/submit', (req, res) => {
  const { firstName, lastName, email, phone, address, application_id } = req.body;

  if (!application_id) {
    return res.status(400).json({ error: 'Application ID is required.' });
  }

  const query = `
    UPDATE student_info 
    SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, is_temp = 0 
    WHERE application_id = ?
  `;

  db.query(query, [firstName, lastName, email, phone, address, application_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No record found to update.' });
    }
    res.status(200).json({ message: 'Application updated successfully!' });
  });
});
// router.get('/application-status/:applicationId', (req, res) => {
//     const { applicationId } = req.params;
    
//     db.query('SELECT status, last_updated FROM applications WHERE application_id = ?', [applicationId], (err, result) => {
//         if (err) {
//             console.error("Database Error:", err);
//             return res.status(500).json({ error: 'Database retrieval failed' });
//         }
//         res.json(result.length > 0 ? result[0] : { status: 'Not Found', last_updated: null });
//     });
// });

module.exports = router;
