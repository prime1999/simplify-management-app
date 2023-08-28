import axios from "axios";

const API_URL = "http://localhost:5000/api/chats";

// ------------------------ function to access/create a one on one chat ------------------- //
export const accessChat = async (token, userId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, { userId }, config);

	return data;
};

// ------------------------ function to get all the user's chats ------------------- //
export const getUsersChat = async (token, userId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(API_URL, config);

	return data;
};

const chatService = {
	accessChat,
	getUsersChat,
};

export default chatService;
