import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

// register user
export const register = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// log user in
export const logUserIn = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// log user out
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, logUserIn, logout };

export default authService;
