import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// get all the current user's tasks
export const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);

  return res.data;
};

// create a new task
export const createTask = async (token, taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, taskData, config);

  return res.data;
};

// delete task
export const deleteTask = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`${API_URL}/${id}`, config);
  console.log(res.data);

  return res.data;
};

const taskService = { getTasks, createTask, deleteTask };

export default taskService;
