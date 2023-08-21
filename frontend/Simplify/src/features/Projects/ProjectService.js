import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

// ---------------------------------function to create a project------------------------------- //
const createProject = async (token, projectData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, projectData, config);
  return data;
};

// ---------------------------------function to get user's projects------------------------------- //
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);
  return data;
};

// ----------------------------- function to assign a team ------------------------------- //
const assignTeam = async (details, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(API_URL, details, config);
  return data;
};

// ----------------------------- function to update a project ------------------------------- //
const updateProject = async (projectId, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`${API_URL}/${projectId}`, updatedData, config);
  return data;
};

// ----------------------------- function to delete a project ------------------------------- //
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${API_URL}/${projectId}`, config);
  return data;
};

const projectService = {
  createProject,
  getProjects,
  assignTeam,
  updateProject,
  deleteProject
};

export default projectService;
