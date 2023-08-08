const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createTeam,
  fetchProjectTeams,
  fetchTeams,
  addNewMember,
  updateTeamDetails,
  removeProjecfromTeam,
  removeMember,
  removeTeam,
} = require("../Controllers/TeamController");

const teamRoute = express.Router();

// @create a team: post
// @fetch teams: get
// @fetch a project team: get
// @update a new team member: put
// @remove a team member: put
// @update team details: put
// @update team project: put
// @remove team: delete

// create a team
teamRoute.post("/", protect, createTeam);

// route to fetch a project team
teamRoute.get("/:projectId", protect, fetchProjectTeams);

// route to get teams
teamRoute.get("/", protect, fetchTeams);

// route to add a new member to a team
teamRoute.put("/", protect, addNewMember);

// route to update the team details
teamRoute.put("/:teamId", protect, updateTeamDetails);

// route to remove a member from a team
teamRoute.put("/removeMember/:teamId", protect, removeMember);

// route to remove a project from a team
teamRoute.patch("/projects", protect, removeProjecfromTeam);

// route to delete a team
teamRoute.delete("/:teamId", protect, removeTeam);

module.exports = teamRoute;
