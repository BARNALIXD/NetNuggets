const express = require('express');
const Website = require('../models/Website');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all approved websites
router.get('/', async (req, res) => {
  try {
    const websites = await Website.find({ approved: true }).sort({ createdAt: -1 });
    res.json(websites);
  } catch (error) {
    console.error('Get websites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get website by ID
router.get('/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.json(website);
  } catch (error) {
    console.error('Get website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create website (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { name, url, description, category, thumbnail, featured, approved } = req.body;

    const website = new Website({
      name,
      url,
      description,
      category,
      thumbnail: thumbnail || '🌐',
      featured: featured || false,
      approved: approved !== undefined ? approved : true,
      submittedBy: req.userId,
    });

    await website.save();
    res.status(201).json(website);
  } catch (error) {
    console.error('Create website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update website (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, url, description, category, thumbnail, featured, approved } = req.body;

    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    if (name) website.name = name;
    if (url) website.url = url;
    if (description) website.description = description;
    if (category) website.category = category;
    if (thumbnail) website.thumbnail = thumbnail;
    if (featured !== undefined) website.featured = featured;
    if (approved !== undefined) website.approved = approved;

    await website.save();
    res.json(website);
  } catch (error) {
    console.error('Update website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete website (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    await Website.findByIdAndDelete(req.params.id);
    res.json({ message: 'Website deleted successfully' });
  } catch (error) {
    console.error('Delete website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate a website (authenticated users)
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    // Add rating to website
    website.ratings.push(rating);
    await website.save();

    // Update user's rating
    const user = await User.findById(req.userId);
    user.ratings.set(req.params.id, rating);
    await user.save();

    res.json(website);
  } catch (error) {
    console.error('Rate website error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
