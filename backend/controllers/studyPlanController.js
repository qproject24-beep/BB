const StudyPlan = require('../models/StudyPlan');
const Task = require('../models/Task');

// @desc    Get study plans (all for admin, own for student)
// @route   GET /api/study-plans
// @access  Private
const getStudyPlans = async (req, res) => {
  try {
    let studyPlans;
    if (req.user.role === 'admin') {
      studyPlans = await StudyPlan.find({}).populate('userId', 'name email');
    } else {
      studyPlans = await StudyPlan.find({ userId: req.user._id });
    }
    res.json(studyPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create study plan
// @route   POST /api/study-plans
// @access  Private
const createStudyPlan = async (req, res) => {
  try {
    const { title, subjects, schedule } = req.body;

    const studyPlan = new StudyPlan({
      userId: req.user._id,
      title,
      subjects,
      schedule,
    });

    const createdStudyPlan = await studyPlan.save();
    res.status(201).json(createdStudyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update study plan
// @route   PUT /api/study-plans/:id
// @access  Private
const updateStudyPlan = async (req, res) => {
  try {
    const { title, subjects, schedule, progress } = req.body;
    const studyPlan = await StudyPlan.findById(req.params.id);

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    // Check user
    if (studyPlan.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    studyPlan.title = title || studyPlan.title;
    studyPlan.subjects = subjects || studyPlan.subjects;
    studyPlan.schedule = schedule || studyPlan.schedule;
    if (progress !== undefined) studyPlan.progress = progress;

    const updatedStudyPlan = await studyPlan.save();
    res.json(updatedStudyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete study plan
// @route   DELETE /api/study-plans/:id
// @access  Private
const deleteStudyPlan = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findById(req.params.id);

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    // Check user
    if (studyPlan.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Task.deleteMany({ studyPlanId: studyPlan._id }); // Delete associated tasks
    await studyPlan.deleteOne();

    res.json({ message: 'Study plan removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudyPlans,
  createStudyPlan,
  updateStudyPlan,
  deleteStudyPlan,
};
