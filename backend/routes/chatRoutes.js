const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	accessChat,
	getUserChats,
	createGroupChat,
	renameGroupChat,
	addUserToGroup,
	removeUserFromGroup,
} = require("../Controllers/ChatController");

const chatRoute = express.Router();
//Routes
// create and access chats chat (post)
// create group chat (post)
// get group chats (get)
// rename a group chat (update)
// remove a user from a group chat (update)
// add a user to a group chat (update)

// access/create a one on one chat
chatRoute.post("/", protect, accessChat);
// get all of chats that the user is a part of
chatRoute.get("/", protect, getUserChats);
// create a group chat
chatRoute.post("/group", protect, createGroupChat);
// rename group chat
chatRoute.put("/rename", protect, renameGroupChat);
// add a user to group
chatRoute.put("/add", protect, addUserToGroup);
// remove a user from a group
chatRoute.put("/remove", protect, removeUserFromGroup);

module.exports = chatRoute;
