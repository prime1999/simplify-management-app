const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	createMessage,
	getAllMessages,
} = require("../Controllers/MessageController");

const messageRoute = express.Router();

// Get: to get all messages of a chat
// Post: to create a new message

messageRoute.get("/:chatId", protect, getAllMessages);
messageRoute.post("/", protect, createMessage);

module.exports = messageRoute;
