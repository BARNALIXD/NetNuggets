const express = require('express');
const User = require('../models/User');
const Website = require('../models/Website');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all submissions
router.get('/submissions', auth, admin, async (req, res) => {
  try {
    const submissions = await Submission.find().populate('submittedBy', 'name email').sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve submission
router.post('/submissions/:id/approve', auth, admin, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Create a new website from the submission
    const website = new Website({
      name: submission.name,
      url: submission.url,
      description: submission.description,
      category: submission.category,
      thumbnail: '🌐',
      featured: false,
      approved: true,
      submittedBy: submission.submittedBy,
    });

    await website.save();

    // Update submission status
    submission.status = 'approved';
    await submission.save();

    res.json(website);
  } catch (error) {
    console.error('Approve submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject submission
router.post('/submissions/:id/reject', auth, admin, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.status = 'rejected';
    await submission.save();

    res.json({ message: 'Submission rejected' });
  } catch (error) {
    console.error('Reject submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.userId.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
