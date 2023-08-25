const mongoose = require("mongoose");

// name/id of the sender
// content of the message
// id of the chat which the message belongs to

const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		content: {
			type: String,
			trime: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
