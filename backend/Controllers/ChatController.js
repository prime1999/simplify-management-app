const asyncHandler = require("express-async-handler");
const user = require("../Models/UserModels");
const Chat = require("../Models/ChatModel");

// ----------------------------- function to access or create a one on one chat -------------- //
const accessChat = asyncHandler(async (req, res) => {
	// get the id of the user that current user wants to chat with
	const { userId } = req.body;

	// check if the id was sent
	if (!userId) {
		// if not then
		// throw an error
		throw new Error("Invalid user params");
	}

	// if it was sent then
	// check if the chat already exist in the chats collection
	let isChat = await Chat.find({
		// check only the one on one chats
		isGroupChat: false,
		// and also check that the users in the chat only consist of the current user andthe user whose id was sent
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		// populate (fill) the users with their details except their password using the user model as a reference
		.populate("users", "-password")
		// also populate (fill) the latest message with its details
		.populate("latestMessage");

	// further populate (fill) the sender in the latest message with the name, email, pic of the sender
	isChat = await user.populate(isChat, {
		path: "latestMessage.sender",
		select: "name, email, pic",
	});

	// check if any chat was found
	if (isChat.length > 0) {
		// then send the chat to the frontend
		res.send(isChat[0]);
	} else {
		// if the chat doesn't exist then create one
		// get the chat data
		let chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId],
		};
		try {
			// create a chat using the chat data
			const createChat = await Chat.create(chatData);

			const fullChat = await Chat.findOne({ _id: createChat._id })
				// populate (fill) the users with their details except their password using the user model as a reference
				.populate("users", "-password");
			res.status(201);
			res.json(fullChat);
		} catch (error) {
			res.json(400);
			throw new Error(error.message);
		}
	}
});

// ------------------------ function to get all chats of the current user ----------------- //
const getUserChats = asyncHandler(async (req, res) => {
	// check if the user exist
	const userExist = await user.findById(req.user._id);
	if (!userExist) {
		throw new Error("User not Authorised");
	}

	// make a try-catch block
	try {
		// find all the chats that the user is a user/part of
		let chats = await Chat.find({
			users: { $elemMatch: { $eq: req.user._id } },
		})
			// populate (fill) the users with their details except their password using the user model as a reference
			.populate("users", "-password")
			// also populate (fill) the latest message with its details
			.populate("latestMessage")
			// sort the chats from the newest to the oldest
			.sort({ updatedAt: -1 });

		// further populate (fill) the sender in the latest message with the name, email, pic of the sender
		chats = await user.populate(chats, {
			path: "latestMessage.sender",
			select: "name, email, pic",
		});
		res.status(200);
		res.json(chats);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//-------------------------------- function to create a group chat ----------------------------- //
const createGroupChat = asyncHandler(async (req, res) => {
	// get the group chat info from the request body
	const { users, name } = req.body;
	// check if the users and group chat name was sent with the request body
	if (!users || !name) {
		// if not then throw the error message
		throw new Error("Invaid group chat info");
	}
	// if it was sent then
	// parse the users array to a json format
	let chatUsers = JSON.parse(users);
	// check if the users send is not less than two
	if (chatUsers.length < 2) {
		// if it is then throw an error
		throw new Error("You need atleast two members to form a group chat");
	}
	// if it's more than two then add the current user to the chatUsers array
	chatUsers.push(req.user._id);
	// set the group chat data to send to the chat collection
	// -the chat name set to the name in the request body
	// -the isGroupChat field set to true
	// -the group admin set to the user creating the group chat
	// -the list of users set to the list of users provided in the request body including the user
	// creating the group chat
	const groupChatData = {
		chatName: name,
		isGroupChat: true,
		groupAdmin: req.user._id,
		users: chatUsers,
	};

	try {
		const groupChat = await Chat.create(groupChatData);
		// get the group chat created
		// -populate the users array excluding there passwords
		// -populate the groupAdmin field excluding the password
		// -populate the latest message field
		const createdGroupChat = await Chat.find({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("latestMessage")
			.populate("groupAdmin", "-password");

		res.status(201);
		// send the chat created to the frontend
		res.json(createdGroupChat);
	} catch (error) {
		// if there is an error in the try block then
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------- function to change name of a group chat --------------- //
const renameGroupChat = asyncHandler(async (req, res) => {
	// get the group chat info from the request body
	const { chatId, chatName } = req.body;
	// check if the chatId and group chat name was sent with the request body
	if (!chatId || !chatName) {
		// if not then throw the error message
		throw new Error("Invaid group chat info");
	}
	// make a try-catch block
	try {
		// find the chat with the id of the chat sent and update the chat
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				chatName,
			},
			{ new: true }
		)
			// populate the users array in the new chat excluding the password
			.populate("users", "-password")
			// populate the group admin array in the new chat excluding the password
			.populate("groupAdmin", "-password");

		// check if a chat was found and updated
		if (!updatedChat) {
			throw new Error("NO chat found");
		}
		res.status(200);
		res.json(updatedChat);
	} catch (error) {
		// if an error occurs in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------------- function to add a user to a group -------------------- //
const addUserToGroup = asyncHandler(async (req, res) => {
	// get the group chat info from the request body
	const { chatId, userId } = req.body;
	// check if the chatId and group userId was sent with the request body
	if (!chatId || !userId) {
		// if not then throw the error message
		throw new Error("Invaid data");
	}
	// make a try-catch block
	try {
		// Find the chat to ensure it exists
		const chat = await Chat.findById(chatId);
		// if the chat doesn't exist then throw an error
		if (!chat) {
			throw new Error("Chat not found");
		}
		// Check if the user is already in the users array of the chat
		if (chat.users.includes(userId)) {
			throw new Error("User is already in the group");
		}
		// find the chat with the id of the chat sent and update the chat
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$push: { users: userId },
			},
			{ new: true }
		)
			// populate the users array in the new chat excluding the password
			.populate("users", "-password")
			// populate the group admin array in the new chat excluding the password
			.populate("groupAdmin", "-password");

		// check if a chat was found and updated
		if (!updatedChat) {
			throw new Error("NO chat found");
		}
		res.status(200);
		res.json(updatedChat);
	} catch (error) {
		// if an error occurs in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------------- function to remove a user to a group -------------------- //
const removeUserFromGroup = asyncHandler(async (req, res) => {
	// get the group chat info from the request body
	const { chatId, userId } = req.body;
	// check if the chatId and group userId was sent with the request body
	if (!chatId || !userId) {
		// if not then throw the error message
		throw new Error("Invaid data");
	}
	// make a try-catch block
	try {
		// find the chat with the id of the chat sent and update the chat
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$pull: { users: userId },
			},
			{ new: true }
		)
			// populate the users array in the new chat excluding the password
			.populate("users", "-password")
			// populate the group admin array in the new chat excluding the password
			.populate("groupAdmin", "-password");

		// check if a chat was found and updated
		if (!updatedChat) {
			throw new Error("NO chat found");
		}
		res.status(200);
		res.json(updatedChat);
	} catch (error) {
		// if an error occurs in the try block
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	accessChat,
	getUserChats,
	createGroupChat,
	renameGroupChat,
	addUserToGroup,
	removeUserFromGroup,
};
