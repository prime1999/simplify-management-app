const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getNotes, createNote } = require("../Controllers/NotesController");

const notesRoute = express.Router();

// @getNotes: this will get the notes of the ticket that has the id sent
// @createNotes: this will create a note with the id sent by the user

notesRoute.get("/:taskId", protect, getNotes);
notesRoute.post("/:taskId", protect, createNote);

module.exports = notesRoute;
