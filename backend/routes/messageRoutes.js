const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	createMessage,
	getAllMessages,
	getLatestMessage,
} = require("../Controllers/MessageController");

const messageRoute = express.Router();

// Get: to get all messages of a chat
// Get: to get the latest message of a chat
// Post: to create a new message

messageRoute.get("/:chatId", protect, getAllMessages);
messageRoute.get("/", protect, getLatestMessage);
messageRoute.post("/", protect, createMessage);

module.exports = messageRoute;
