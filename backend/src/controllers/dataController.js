// controllers/dataController.js
const express = require('express');
const router = express.Router(); // Create a new router

// Define your routes here
router.get('/some-endpoint', async (req, res) => {
  // Example route
  try {
    const { rows } = await pool.query('SELECT * FROM transactions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router; // Export the router
