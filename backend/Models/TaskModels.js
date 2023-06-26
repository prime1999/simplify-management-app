const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "personal",
        "work",
        "Home",
        "Family",
        "Education",
        "social",
        "education",
        "travel",
        "financial",
        "miscellaneous",
      ],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    due_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
