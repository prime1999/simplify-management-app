import axios from "axios";

const API_URL = "http://localhost:5000/api/teams";

// ..........................function to get teams created by the current user --------------- //
export const getTeams = async (token) => {
  // define the config object which will contain the tokn to send with the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // make the axios call to the backend
  const { data } = await axios.get(API_URL, config);
  // return the data gotten fron the backend to the slice
  return data;
};

// ..........................function to creating a team --------------- //
export const createTeam = async (teamData, token) => {
  // define the config object which will contain the tokn to send with the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // make the axios call to the backend
  const { data } = await axios.post(API_URL, teamData, config);
  // return the data gotten fron the backend to the slice
  return data;
};

// ..........................function to get team assigned to a project --------------- //
export const getAssignedTeam = async (projectId, token) => {
  // define the config object which will contain the tokn to send with the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // make the axios call to the backend
  const { data } = await axios.get(`${API_URL}/${projectId}`, config);
  // return the data gotten from the backend to the slice
  return data;
};

// ..........................function to remove team assigned to a project --------------- //
export const removeAssignedTeam = async (details, token) => {
  console.log(details)
  // define the config object which will contain the tokn to send with the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // make the axios call to the backend
  const { data } = await axios.patch(`${API_URL}/projects`, details,  config);
  // return the data gotten from the backend to the slice
  return data;
};

const teamService = {
  getTeams,
  createTeam,
  getAssignedTeam,
  removeAssignedTeam,
};

export default teamService;
