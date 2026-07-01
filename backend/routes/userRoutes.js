const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getUsers,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/').get(protect, admin, getUsers);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
