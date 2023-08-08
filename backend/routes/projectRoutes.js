const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  getSingleProject,
  getProjectByStatus,
  searchProject,
  updateProject,
  assignTeam,
  deleteProject,
} = require("../Controllers/ProjectController");

const projectRouter = express.Router();

// ROUTES
// @getProject: get
// @getSingleProjects: get
// @getProjectsByStatus: get
// @searchProject: get
// @createProject: post
// @updateProject: put
// @assign members to a project: put
// @deleteProject: delete

// get projects
projectRouter.get("/", protect, getProjects);

// get single project
projectRouter.get("/:projectId", protect, getSingleProject);

// get project based on status
projectRouter.get("/status/:status", protect, getProjectByStatus);

// search for a project
projectRouter.post("/search", protect, searchProject);

// add project
projectRouter.post("/", protect, createProject);

// update project
projectRouter.put("/:projectId", protect, updateProject);

// assign team to project
projectRouter.put("/", protect, assignTeam);

// delete project
projectRouter.delete("/:projectId", protect, deleteProject);

module.exports = projectRouter;
