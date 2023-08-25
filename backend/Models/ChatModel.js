const mongoose = require("mongoose");
const user = require("./UserModels");

const Schema = mongoose.Schema;

// chat details
// chat name
// chat users
// isGroupChat
// group admin if isGroupChat is true
// latest messages in the chat

const chatSchema = new Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: user,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
