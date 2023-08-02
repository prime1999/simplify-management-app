const asyncHandler = require("express-async-handler");
const user = require("../Models/UserModels");
const task = require("../Models/TaskModels");
const Note = require("../Models/NotesModel");

// function to get all notes of the current user task
const getNotes = asyncHandler(async (req, res) => {
  const User = await user.findById(req.user._id);

  console.log(req.user._id);
  if (!User) {
    res.status(401);
    throw new Error("Unauthorized User");
  }

  try {
    const Task = await task.findById(req.params.taskId);
    if (Task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    const notes = await Note.find({ task: req.params.taskId }).sort({
      createdAt: -1,
    });

    res.status(200);
    res.json(notes);
  } catch (error) {
    console.log("not found");
    res.status(400);
    throw new Error("Not found");
  }
});

// function to create a note for a task
const createNote = asyncHandler(async (req, res) => {
  const User = await user.findById(req.user._id);

  if (!User) {
    res.status(401);
    throw new Error("Unauthorized User");
  }

  try {
    const Task = await task.findById(req.params.taskId);
    if (Task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    const newNote = {
      text: req.body.text,
      user: req.user._id,
      task: req.params.taskId,
    };

    const note = await Note.create(newNote);

    res.status(201);
    res.json(note);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid data");
  }
});

module.exports = { getNotes, createNote };
