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

//create an express router
const router = express.Router();

//get all tasks
router.get("/", getTasks);

//get searched task
router.get("/search", searchTask);

//get searched task based on category
router.get("/category/:category", getTask);

//get single task
router.get("/:id", getSingleTask);

//create a task
router.post("/", createTask);

//delete task
router.delete("/:id", deleteTask);

//update task
router.patch("/:id", updateTask);

module.exports = router;
