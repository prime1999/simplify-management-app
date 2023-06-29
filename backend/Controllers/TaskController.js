const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const task = require("../Models/TaskModels");
const user = require("../Models/UserModels");

//function to get all tasks
const getTasks = asyncHandler(async (req, res) => {
  // check if the user who requested the tasks actually exists
  const userExists = await user.findById(req.user.id);
  // throw an error if user does not exist
  if (!userExists) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  // get all tasks of the user and arrange them in descending order of the created date
  const tasks = await task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

//function to get single task
const getSingleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user exist
  const userExist = await user.findById(req.user.id);
  // throw error if user does not exist
  if (!userExist) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such task");
  }
  const singleTask = await task.findById(id);
  res.status(200).json(singleTask);
});

//function to create task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, category, status, due_date } = req.body;
  // check if the user who requested the tasks actually exists
  const userExists = await user.findById(req.user.id);
  // throw an error if user does not exist
  if (!userExists) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  // throw an error if any of the required fields is not filled
  if (!title || !description || !due_date || !category) {
    res.json(400);
    throw new Error("Please fill in all fields");
  }
  // get all tasks of the user
  const tasks = await task.find();
  // check if the task already exist
  const taskExist = tasks.some((task) => task.title === title);
  // throw error if task already exist
  if (taskExist) {
    res.status(400);
    throw new Error("Task already exist");
  }

  // create task using the details filled in by the user
  const Task = await task.create({
    user: req.user.id,
    title,
    description,
    category,
    status: status ? status : "pending",
    due_date,
  });
  // send the task created to the frontend
  res.status(200).json(Task);
});

//function to search task
const searchTask = asyncHandler(async (req, res) => {
  const search = req.query;
  //check if user exist
  const userExist = await user.findById(req.user.id);
  // throw error if user does not exist
  if (!userExist) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  // search for task
  const tasks = await task.find(search);
  res.status(200).json(tasks);
  // throw error if task does not exist
  if (!tasks) {
    res.status(404);
    throw new Error("No such tasks");
  }
});

//function to get task based on category
const getTask = async (req, res) => {
  const { category } = req.params;
  //check if user exist
  const userExist = await user.findById(req.user.id);
  // throw error if user does not exist
  if (!userExist) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  // search for tasks based on the category
  const tasks = await task.find({
    $expr: { $eq: [{ $toLower: "$category" }, category.toLowerCase()] },
  });
  res.status(200).json(tasks);

  // throw error if task does not exist
  if (!tasks) {
    res.status(404);
    throw new Error("No such tasks");
  }
};

//function to delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  //check if user exist
  const userExist = await user.findById(req.user.id);
  // throw error if user does not exist
  if (!userExist) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("task does not exist");
  }
  const deleteTask = await task.findOneAndDelete({ _id: id });
  res.status(200).json(deleteTask);
};

//function to update task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user exist
  const userExist = await user.findById(req.user.id);
  // throw error if user does not exist
  if (!userExist) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("task does not exist");
  }

  const taskExist = await task.findById(id);
  // throw an error if task is not found
  if (!taskExist) {
    res.json(404);
    throw new Error("task not found");
  }

  const updatedTask = await task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(updatedTask);
});

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  searchTask,
  getTask,
  deleteTask,
  updateTask,
};
