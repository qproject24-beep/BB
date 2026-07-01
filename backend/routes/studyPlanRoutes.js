const express = require('express');
const router = express.Router();
const {
  getStudyPlans,
  createStudyPlan,
  updateStudyPlan,
  deleteStudyPlan,
} = require('../controllers/studyPlanController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStudyPlans).post(protect, createStudyPlan);
router
  .route('/:id')
  .put(protect, updateStudyPlan)
  .delete(protect, deleteStudyPlan);

module.exports = router;
