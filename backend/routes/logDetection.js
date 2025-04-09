const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');

router.post('/', async (req, res) => {
  try {
    const { timestamp, peopleCount } = req.body;
    const detection = new Detection({ timestamp, peopleCount });
    await detection.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving detection:', err);
    res.status(500).json({ error: 'Failed to log detection' });
  }
});

module.exports = router;
