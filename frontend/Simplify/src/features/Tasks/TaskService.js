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

const taskService = { getTasks };

export default taskService;
