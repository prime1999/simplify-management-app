const asyncHandler = require("express-async-handler");
const Project = require("../Models/ProjectModel");
const user = require("../Models/UserModels");
const Team = require("../Models/TeamModel");

// -------------------------------- function to create a team --------------------------------- //
const createTeam = asyncHandler(async (req, res) => {
  // check if the current user is in the database
  const userExist = await user.findById(req.user._id);
  // get the details sent by the user from the request body
  const { name, description, members } = req.body;

  if (!name || !description || !members) {
    throw new Error("Invalid data");
  }
  // make a try-catch block
  try {
    // if the user is not in the database then throw an error message
    if (!userExist) {
      throw new Error("User Not Authorized");
    }

    // parse the member to a javasript array and store it in the participants variable
    const participants = JSON.parse(members);
    // create a new team object with the necessary details needed by the database
    const newTeam = {
      name,
      description,
      members: [...participants, req.user._id],
      teamLeader: req.user._id,
      createdBy: req.user._id,
      projects: null,
    };
    // create a team with the new team object
    const team = await Team.create(newTeam);
    // send the team created to the frontend with the status code of 201
    res.status(201);
    res.json(team);
  } catch (error) {
    // if any error occurs in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
  }
});

// --------------------------- function to fetch teams for a project --------------------- //\
const fetchProjectTeams = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  const { projectId } = req.params;

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project does not exist");
    }

    const projectTeam = await Team.find({
      projects: { $elemMatch: { $eq: project._id } },
    })
      .populate("members", "-password")
      .populate("teamLeader", "-password")
      .populate("createdBy", "-password");

    if (projectTeam.length === 0) {
      throw new Error("No team has been assigned to project");
    }
    res.status(200);
    res.json(projectTeam);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// --------------------------- function to fetch all teams created by current user ----------- //
const fetchTeams = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const teams = await Team.find({ createdBy: req.user._id })
      .populate("members", "-password")
      .populate("teamLeader", "-password")
      .populate("createdBy", "-password");

    if (teams.length === 0) {
      throw new Error("No teams created by you");
    }

    res.status(200);
    res.json(teams);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// ------------------------------ funtion to add a member to a team ----------------------- //
const addNewMember = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  const { teamId, newMemberId } = req.body;

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const teamExist = await Team.findById(teamId);

    if (!teamExist) {
      throw new Error("Team not Created");
    }

    const checkMember = teamExist.members.some(
      (member) => member === newMemberId
    );

    if (checkMember) {
      throw new Error("Member already exist");
    }

    const updatedTeamMember = await Team.findOneAndUpdate(
      { _id: teamId },
      // then update the members array to push the new member to be added to the array
      {
        $push: { members: newMemberId },
      },
      // set new to true for it to work
      {
        new: true,
      }
    );
    res.status(200);
    res.json(updatedTeamMember);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// ----------------------------- function to remove a projects from under a team --------------- //
const removeProjecfromTeam = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  const { teamId, projectId } = req.body;

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const teamExist = await Team.findById(teamId);

    if (!teamExist) {
      throw new Error("Team not Created");
    }

    const checkProjectsUnderTeam = teamExist.projects.some(
      (project) => project.toString() === projectId
    );

    console.log(teamExist);
    console.log(projectId);

    if (!checkProjectsUnderTeam) {
      throw new Error("Project not handled by this team");
    }

    const updateTeamProjects = await Team.findByIdAndUpdate(
      teamId,
      // then update the projects array to pull the project to be removed from the array
      {
        $pull: { projects: projectId },
      },
      // set new to true for it to work
      { new: true }
    );

    res.status(200);
    res.json(updateTeamProjects);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// -------------------------------------- function to update team details ---------------------- //
const updateTeamDetails = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const teamExist = await Team.findById(req.params.teamId);

    console.log(req.params.teamId);

    if (!teamExist) {
      throw new Error("Team not Created");
    }

    const updatedTeam = await Team.findByIdAndUpdate(req.params.teamId, {
      ...req.body,
    });

    res.status(200);
    res.json(updatedTeam);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// ---------------------------------------- function to remove team member from a team --------------- //
const removeMember = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  const { memberId } = req.body;

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }

    const teamExist = await Team.findById(req.params.teamId);

    if (!teamExist) {
      throw new Error("Team does not exist");
    }

    const updateMembers = await Team.findByIdAndUpdate(
      req.params.teamId,
      // then update the members array to pull the member to be removed from the array
      {
        $pull: { members: memberId },
      },
      // set new to true for it to work
      { new: true }
    );

    res.status(200);
    res.json(updateMembers);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// -------------------------------- function to delete a team ------------------------------- //
const removeTeam = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user._id);

  try {
    if (!userExist) {
      throw new Error("User Not Authorised");
    }
    const teamExist = await Team.findById(req.params.teamId);

    if (!teamExist) {
      throw new Error("Team does not exist");
    }

    const removedTeam = await Team.findByIdAndDelete(req.params.teamId);

    res.status(200);
    res.json(removedTeam);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = {
  createTeam,
  fetchProjectTeams,
  fetchTeams,
  addNewMember,
  removeProjecfromTeam,
  updateTeamDetails,
  removeMember,
  removeTeam,
};
