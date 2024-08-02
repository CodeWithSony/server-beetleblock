// routes/users.js
// const express = require('express');
import express from "express"
import User from '../models/User.js'

const router = express.Router();
// POST /api/register - Register a new user
router.post('/register', async (req, res) => {
  const { name, email, age } = req.body;

  // Validate user data
  if (!name || !email || !age || isNaN(age)) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/users - Retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// module.exports = router;
export default router;
