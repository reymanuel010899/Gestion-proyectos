const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    description: {
      type: String,
      default: null,
      trim: true
    },
    status: {
      type: String,
      enum: ['pendiente', 'en progreso', 'completada'],
      default: 'pendiente',
      index: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'medium',
      index: true
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    due_date: {
      type: Date,
      default: null
    },

    point: {
      type: Number,
      default: 0,
      min: 0
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

TaskSchema.index({ project_id: 1, status: 1 });
TaskSchema.index({ project_id: 1, assignee: 1 });

module.exports = mongoose.model('Task', TaskSchema);
