const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    description: {
      type: String,
      require: true,
    },
    startDate: {
      type: String,
      require: true,
    },
    endDate: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
