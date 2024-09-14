// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const User = require('../models/User');
// const Problem = require('../models/Problem');
// const Topic = require('../models/Topic');
// const adminAuth = require('../middleware/adminAuth');
// const { getUsers, getProblems, deleteProblem } = require('../controllers/adminController');

// // Admin login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     const payload = { admin: { id: admin.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Get dashboard statistics
// router.get('/stats', adminAuth, async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalProblems = await Problem.countDocuments();
//     const easyProblems = await Problem.countDocuments({ difficulty: 'Easy' });
//     const mediumProblems = await Problem.countDocuments({ difficulty: 'Medium' });
//     const hardProblems = await Problem.countDocuments({ difficulty: 'Hard' });

//     res.json({ totalUsers, totalProblems, easyProblems, mediumProblems, hardProblems });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Error destroying session:', err);
//       return res.status(500).send('Error logging out');
//     }
//     res.json({ msg: 'Logged out successfully' });
//   });
// });

// // Get all users
// router.get('/users', adminAuth, getUsers);

// // Delete a user
// router.delete('/users/:id', adminAuth, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/problems', adminAuth, getProblems);
// router.delete('/problems/:id', adminAuth, deleteProblem);

// // Add a new problem
// router.post('/problems', adminAuth, async (req, res) => {
//   const problem = new Problem(req.body);
//   try {
//     const newProblem = await problem.save();
//     res.status(201).json(newProblem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Add a new topic
// router.post('/topics', adminAuth, async (req, res) => {
//   try {
//     const topic = new Topic(req.body);
//     await topic.save();
//     res.json(topic);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Problem = require('../models/Problem');
const Topic = require('../models/Topic');
const adminAuth = require('../middleware/adminAuth');
const { getUsers, getProblems, deleteProblem } = require('../controllers/adminController');

// Admin login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { admin: { id: admin.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all users
router.get('/users', adminAuth, getUsers);

// Delete a user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/problems', adminAuth, getProblems);
router.delete('/problems/:id', adminAuth, deleteProblem);

module.exports = router;