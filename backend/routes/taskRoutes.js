const express = require("express");
const {
  getTasks,
  getSingleTask,
  createTask,
  searchTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../Controllers/TaskController");
const { protect } = require("../middleware/authMiddleware");

//create an express router
const router = express.Router();

//get all tasks
router.get("/", protect, getTasks);

//get searched task
router.get("/search", protect, searchTask);

//get searched task based on category
router.get("/category/:category", protect, getTask);

//get single task
router.get("/:id", protect, getSingleTask);

//create a task
router.post("/", protect, createTask);

//delete task
router.delete("/:id", protect, deleteTask);

//update task
router.patch("/:id", protect, updateTask);

module.exports = router;
