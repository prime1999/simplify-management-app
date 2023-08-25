const asyncHandler = require("express-async-handler");
const Chat = require("../Models/ChatModel");
const user = require("../Models/UserModels");
const Message = require("../Models/MessageModel");

// --------------------------- function to create message for a chat ----------------------- //
const createMessage = asyncHandler(async (req, res) => {
	// get the chatId and the message content from the request body
	const { chatId, content } = req.body;
	// check if the chatId and the content
	if (!chatId || !content) {
		// if not then
		throw new Error("Invalid data");
	}
	// if the chatId and content was sent with the request body then
	// create a new message object with
	// sender's id (current user's id)
	// content of the message
	// id of the chat the message belongs to

	let newMessage = {
		sender: req.user._id,
		content,
		chat: chatId,
	};
	try {
		// create a new message in the message collection using the newMessage object
		let message = await Message.create(newMessage);
		// populate(fill) the sender object with the sender details
		message = await message.populate("sender", "name pic");
		// populate(fill) chat array with the chat details
		message = await message.populate("chat");
		// further populate the users field in the chat using the user model as a reference
		message = await user.populate(message, {
			path: "chat.users",
			select: "name email pic",
		});
		// update the chat that the message belongs to to take the message as it's latest message
		await Chat.findByIdAndUpdate(
			chatId,
			// update the latest messge field
			{ latestMessage: message }
		);
		// sendt the message to the frontend
		res.status(201);
		res.json(message);
	} catch (error) {
		// if an error appears in the try block, then
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------ function to get all messages of a chat ------------------------ //
const getAllMessages = asyncHandler(async (req, res) => {
	try {
		// find all messages of the chat with the id of the chatId sent in th erquest parameter
		const messages = await Message.find({ chat: req.params.chatId })
			// populate (fill) the sender object with the info of the sender of te message
			.populate("sender", "name pic email")
			// populate (fill) the chat with the details of the chat the message belongs to
			.populate("chat");
		// send the messages found to the frontend
		res.status(200);
		res.json(messages);
	} catch (error) {
		// if an error appers in the try block, then
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	createMessage,
	getAllMessages,
};
