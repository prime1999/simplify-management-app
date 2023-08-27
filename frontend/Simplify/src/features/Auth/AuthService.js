import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

// ------------------------------------ register user ----------------------------------- //
export const register = async (userData) => {
	// send a request to the backend to register a user
	const res = await axios.post(API_URL, userData);
	// check if a data was sent back
	if (res.data) {
		// save the data gotten from the backend to local-storage
		localStorage.setItem("user", JSON.stringify(res.data));
	}
	// return the data to the auth slice
	return res.data;
};

// ------------------------------ log user in --------------------------------- //
export const logUserIn = async (userData) => {
	// send a request to the backend to log a user in
	const res = await axios.post(`${API_URL}/login`, userData);
	// check if a data was sent back
	if (res.data) {
		// save the data gotten from the backend to local-storage
		localStorage.setItem("user", JSON.stringify(res.data));
	}
	// return the data to the auth slice
	return res.data;
};

// ------------------------------------- get users ---------------------------------------- //
export const getUsers = async (token) => {
	// create a confing with the token to send with the request
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send a request to the backend to get users
	const { data } = await axios.get(`${API_URL}/users`, config);
	// return the data to the auth slice
	return { data };
};

// -------------------------------------- search for a user ---------------------------------- //
export const searchUser = async (user, token) => {
	// create a confing with the token to send with the request
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(`${API_URL}?search=${user}`, config);
	// return the data to the auth slice
	return data;
};

// ---------------------------------------- log user out -------------------------------- //
const logout = async () => {
	// remove the user saved to local-storage
	localStorage.removeItem("user");
};

const authService = {
	register,
	logUserIn,
	getUsers,
	searchUser,
	logout,
};

export default authService;
