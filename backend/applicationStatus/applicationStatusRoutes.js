const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/application-status/:applicationId', async (req, res) => {
    const { applicationId } = req.params;

    try {
        const [rows] = await db.query(
            `SELECT status FROM applications WHERE application_id = ?`,
            [applicationId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Application not found." });
        }

        res.json({ status: rows[0].status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching application status." });
    }
});

module.exports = router;