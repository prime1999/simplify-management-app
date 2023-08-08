const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const user = require("../Models/UserModels");
const Project = require("../Models/ProjectModel");
const Team = require("../Models/TeamModel");

// -------------------------- function to create projects ------------------------- //
const createProject = asyncHandler(async (req, res) => {
  // get the projects details sent by the users from the request body
  const { title, description, status, startDate, endDate, teamId } = req.body;
  // find the user by its id from the user database
  const userExist = await user.findById(req.user._id);
  // if the user does not exist throw the error message
  if (!userExist) {
    res.status(400);
    throw new Error("User Not Authorized");
  }
  // make a try catch block
  try {
    // check if the required document were sent from the frontend
    if (!title || !description || !status || !startDate || !endDate) {
      // if not then throw the error message with the status code of 401
      res.status(401);
      throw new Error("Please Fill In All Fields");
    }

    // const users = JSON.parse(participants);

    // find the projects in the project database
    const projects = await Project.find();
    // check if any iof the projects found has the same title and status as the details sent by the user
    const projectExist = projects.some(
      (project) => project.title === title && project.status === status
    );
    // if the project exist then throw the error message
    if (projectExist) {
      res.status(401);
      throw new Error("project already exist");
    }
    // check if the team has been created
    let team = null;
    if (teamId) {
      team = await Team.findById(teamId);
    }
    // if it doesn't exist then create a projects using th details from the frontend
    const project = await Project.create({
      user: req.user._id,
      title,
      description,
      status,
      startDate,
      endDate,
      participants: team ? [...team.members] : null,
      team: team._id,
    });
    console.log(project);
    // after project has been created, send it to the frontend with a status code of 201
    res.status(201);
    res.json(project);
  } catch (error) {
    // there is an error in the try block then throw the error message with a status code of 401
    res.status(401);
    throw new Error(error.message);
  }
});

// ------------------------ function to get projects ------------------------- //
const getProjects = asyncHandler(async (req, res) => {
  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);
  // make a try catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      rea.status(400);
      throw new error("User Not Authorized");
    }
    // search for any project the user in participating in
    const projects = await Project.find({ user: req.user._id })
      // add other details to the participants array except the password using the user ref
      .populate("participants", "-password");
    // send the projects found to the frontend
    res.status(200);
    res.json(projects);
  } catch (error) {
    // if there is an error in the try block then throw the error message with the status code 401
    res.status(401);
    throw new Error(error.message);
  }
});

// --------------------------------- function to get single project ------------------------- //
const getSingleProject = asyncHandler(async (req, res) => {
  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);
  // get the project id from the request parameter
  const { projectId } = req.params;
  // make a try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User not Authorized");
    }
    // search for a project that has the project id and also the user has the creator for the project db
    const project = await Project.find({
      _id: projectId,
      user: req.user._id,
    }).populate("participants", "-password");
    // if such project does not exist then throw the error message
    if (!project) {
      res.status(401);
      throw new Error("Project Not Found");
    }
    // send the project found to the frontend
    res.status(200);
    res.json(project);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// --------------------------------------- function to get a project based on the status ---------- //
const getProjectByStatus = asyncHandler(async (req, res) => {
  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);
  // get the status from the request parameter
  const { status } = req.params;
  // make try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User Not Authorized");
    }
    // search for  any of the current user's project that has the status has the one requested
    const projects = await Project.find({
      // turn the status send to lower case word
      $expr: { $eq: [{ $toLower: "$status" }, status.toLowerCase()] },
    }).populate("participants", "-password");
    // if no project was found then throw the error message
    if (!projects) {
      res.status(401);
      throw new Error("Project Not Found");
    }
    // send the projects found to the frontend
    res.status(200);
    res.json(projects);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// ----------------------------------- search projects by their title -------------------------- //
const searchProject = asyncHandler(async (req, res) => {
  // get the searched word/sentence from the
  const search = req.query.title;

  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);

  // make try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User Not Authorized");
    }
    // make the search word/sentence case insenitive
    const searchRegex = new RegExp(search, "i");

    // search for  any of the current user's project that has the status has the one requested
    const project = await Project.find({
      title: searchRegex,
    }).populate("participants", "-password");
    // if no project was found then throw the error message
    if (!project) {
      res.status(401);
      throw new Error("Project Not Found");
    }
    // send the projects found to the frontend
    res.status(200);
    res.json(project);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// ---------------------------------------- function to update project ----------------------------- //
const updateProject = asyncHandler(async (req, res) => {
  // get the id from the request parameter
  const { projectId } = req.params;

  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);

  // make try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User Not Authorized");
    }

    // search for  any of the current user's project that has the status has the one requested
    const project = await Project.findById(projectId);
    // if no project was found then throw the error message
    if (!project) {
      res.status(401);
      throw new Error("Project Not Found");
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { ...req.body }
    ).populate("participants", "-password");
    // send the projects found to the frontend
    res.status(200);
    res.json(updatedProject);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// ------------------------------- function to assign a team to a project --------------------------- //
const assignTeam = asyncHandler(async (req, res) => {
  // get the team id from the request body
  const { teamId, projectId } = req.body;

  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);

  // make try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User Not Authorized");
    }

    const teams = await Team.find();
    // check if the id already exist in the projects folder of each team
    const teamExist = teams.some(
      (team) => team.projects !== null && team.projects.includes(projectId)
    );
    // if the teams exist then throw an error message
    if (teamExist) {
      throw new Error("A team already assigned to this project");
    }

    // search for  any of the current user's project that has the status has the one requested
    const team = await Team.findById(teamId);
    // if no project was found then throw the error message
    if (!team) {
      res.status(401);
      throw new Error("Team Not Found");
    }

    const projectList = [];

    projectList.push(projectId);

    // update the team to include the project
    await Team.findOneAndUpdate({ _id: teamId }, { projects: projectList });

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { participants: team.members, team: teamId }
    ).populate("participants", "-password");
    // send the projects found to the frontend
    res.status(200);
    res.json(updatedProject);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// --------------------------- function to delete a project ------------------------------- //
const deleteProject = asyncHandler(async (req, res) => {
  // get the id of the project to remove from the request parameter sent
  const { projectId } = req.params;

  // search for the current user in the user db using the user's id
  const userExist = await user.findById(req.user._id);

  // make try-catch block
  try {
    // if the user does not exist then throw the error message
    if (!userExist) {
      res.status(400);
      throw new Error("User Not Authorized");
    }

    // search for  any of the current user's project that has the status has the one requested
    const project = await Project.findById(projectId);
    // if no project was found then throw the error message
    if (!project) {
      res.status(401);
      throw new Error("Project Not Found");
    }

    const deletedProject = await Project.findOneAndDelete({ _id: projectId });
    // send the projects found to the frontend
    res.status(200);
    res.json(deletedProject);
  } catch (error) {
    // if there is an error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = {
  createProject,
  getProjects,
  getSingleProject,
  getProjectByStatus,
  searchProject,
  updateProject,
  assignTeam,
  deleteProject,
};
