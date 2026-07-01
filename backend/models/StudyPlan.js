const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title for the study plan'],
    },
    subjects: {
      type: [String],
      required: [true, 'Please add at least one subject'],
    },
    schedule: {
      type: Date,
      required: [true, 'Please add a schedule/deadline date'],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
