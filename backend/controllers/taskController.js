const Task = require('../models/Task');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find({}).populate('userId', 'name email').populate('studyPlanId', 'title');
    } else {
      tasks = await Task.find({ userId: req.user._id }).populate('studyPlanId', 'title');
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, studyPlanId } = req.body;

    const task = new Task({
      userId: req.user._id,
      studyPlanId: studyPlanId || undefined,
      title,
      description,
      dueDate,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, studyPlanId } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check user
    if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    if (studyPlanId) task.studyPlanId = studyPlanId;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check user
    if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
