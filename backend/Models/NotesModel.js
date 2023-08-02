const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotesSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "task",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NotesSchema);
