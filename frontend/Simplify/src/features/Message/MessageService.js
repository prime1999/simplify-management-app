import axios from "axios";

const API_URL = "http://localhost:5000/api/message";

// --------------------------- function to send a message ----------------------------- //
const sendMessage = async (messageDetails, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, messageDetails, config);
	return data;
};

// --------------------------- function to fetch all messages of a chat ----------------------------- //
const fetchMessages = async (chatId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${API_URL}/${chatId}`, config);
	return data;
};

const messageService = {
	sendMessage,
	fetchMessages,
};

export default messageService;
