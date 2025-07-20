const express = require('express');
const { InputValue } = require('./db');

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// GET /api/input-value - Get the latest input value from the database
router.get('/input-value', async (req, res) => {
  try {
    const latestValue = await InputValue.findOne().sort({ createdAt: -1 });
    if (latestValue) {
      res.json({ value: latestValue.value });
    } else {
      res.json({ value: '' });
    }
  } catch (error) {
    console.error('Error fetching input value:', error);
    res.status(500).json({ error: 'Failed to fetch input value' });
  }
});

// POST /api/input-value - Save a new input value to the database
router.post('/input-value', async (req, res) => {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: 'Value is required' });
    }
    const newValue = new InputValue({ value });
    await newValue.save();
    res.json({ message: 'Value saved successfully', value });
  } catch (error) {
    console.error('Error saving input value:', error);
    res.status(500).json({ error: 'Failed to save input value' });
  }
});

module.exports = router;
