const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },

    description: {
      type: String,
      default: null,
      trim: true
    },
    priority: {
      type: String,
      enum: ['Medium', 'Low', 'High', 'Critical'],
      default: 'Medium'
    },

    status: {
      type: String,
      enum: ['New', 'Active', 'Completed', 'Archived'],
      default: 'active'
    },
    
    progress: {
      type: Number,
      default: 0, 
      min: 0,
      max: 100
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Project", projectSchema);