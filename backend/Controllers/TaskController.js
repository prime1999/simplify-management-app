const mongoose = require("mongoose");
const task = require("../Models/TaskModels");

//function to get all tasks
const getTasks = async (req, res) => {
  const tasks = await task.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

//function to get single task
const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such task" });
  }
  const singleTask = await task.findById(id);
  res.status(200).json(singleTask);
};

//function to create task
const createTask = async (req, res) => {
  const { title, description, status, due_date } = req.body;

  try {
    const Task = await task.create({ title, description, status, due_date });
    res.status(200).json(Task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//function to search task
const searchTask = async (req, res) => {
  const search = req.query;

  try {
    const tasks = await task.find(search);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: "No such task" });
  }
};

//function to get task based on category
const getTask = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    const tasks = await task.find({
      $expr: { $eq: [{ $toLower: "$category" }, category.toLowerCase()] },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: "No such task" });
  }
};

//function to delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "task does not exist" });
  }
  const deleteTask = await task.findOneAndDelete({ _id: id });
  res.status(200).json(deleteTask);
};

//function to update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "task does not exist" });
  }
  const updatedTask = await task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedTask) {
    res.status(404).json({ error: "Task does not exist" });
  }
  res.status(200).json(updatedTask);
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  searchTask,
  getTask,
  deleteTask,
  updateTask,
};
