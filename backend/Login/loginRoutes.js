const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'main'
});

router.post('/', (req, res) => {
  const { application_id, password } = req.body;

  db.query(
    'SELECT * FROM student_info WHERE application_id = ?',
    [application_id],
    (err, results) => {
      if (err) return res.status(500).send(err);

      const user = results[0];
      if (!user) return res.status(404).send('User not found');

      if (user.password !== password) {
        return res.status(401).send('Incorrect password');
      }

      if (user.is_temp) {
        return res.status(200).json({ changePassword: true, application_id: user.application_id });
      }

      // Send application_id as part of the response
      res.status(200).json({ dashboard: true, application_id: user.application_id });
    }
  );
});


router.post('/change-password', (req, res) => {
  const { application_id, newPassword } = req.body;

  const query = 'UPDATE student_info SET password = ?, is_temp = 0 WHERE application_id = ?';

  db.query(query, [newPassword, application_id], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.affectedRows === 0) return res.status(404).send('User not found');
    res.status(200).send('Password updated successfully');
  });
});

module.exports = router;
