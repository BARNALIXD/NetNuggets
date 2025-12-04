const express = require('express');
const User = require('../models/User');
const Website = require('../models/Website');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');

const router = express.Router();

// Toggle bookmark
router.post('/bookmark', auth, async (req, res) => {
  try {
    const { websiteId } = req.body;

    const user = await User.findById(req.userId);
    const website = await Website.findById(websiteId);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    const bookmarkIndex = user.bookmarks.indexOf(websiteId);

    if (bookmarkIndex > -1) {
      // Remove bookmark
      user.bookmarks.splice(bookmarkIndex, 1);
    } else {
      // Add bookmark
      user.bookmarks.push(websiteId);
    }

    await user.save();
    res.json(user.toJSON());
  } catch (error) {
    console.error('Toggle bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookmarks
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a website for review
router.post('/submit', auth, async (req, res) => {
  try {
    const { name, url, description, category } = req.body;

    if (!name || !url || !description || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const submission = new Submission({
      name,
      url,
      description,
      category,
      submittedBy: req.userId,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Submit website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
