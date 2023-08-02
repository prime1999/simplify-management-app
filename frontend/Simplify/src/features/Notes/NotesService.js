import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

const getNotes = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_URL}/${taskId}`, config);
  return data;
};

const createNotes = async (taskId, note, token) => {
  console.log(note);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    `${API_URL}/${taskId}`,
    { text: note },
    config
  );
  console.log(data);
  return data;
};

const noteService = {
  getNotes,
  createNotes,
};

export default noteService;
