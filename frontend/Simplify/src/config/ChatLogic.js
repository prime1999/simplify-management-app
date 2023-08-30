export const getOtherUser = (chat, currentUser) => {
	const user = chat.users.filter((user) => user._id !== currentUser.id);

	return user[0];
};

export const isSameSender = (messages, message, index, user) => {
	return (
		// // check if the message is not the last message in the array
		// index < messages.length - 1 &&
		// // check if the sender of the current message is different from the sender of the next message
		// (messages[index + 1].sender._id !== message.sender._id ||
		// 	// check if there is a next message in the message array
		// 	messages[index + 1].sender._id === undefined)
		index < messages.length - 1 &&
		(messages[index + 1].sender?._id === message.sender?._id ||
			index === messages.length - 1)
	);
};

export const isFirstMessage = (messages, message, user, index) => {
	return (
		// // check if the message is the first message in the array
		// index === 0 ||
		// // check if the sender is not the sender og the previous message
		// (messages[index - 1].sender._id !== messages[index].sender._id &&
		// 	// check if the message sender is a truthy
		// 	messages[messages.length - 1].sender._id)
		index === 0 ||
		(index !== 0 && messages[index - 1].sender?._id !== message.sender?._id)
	);
};

export const isSameUser = (messages, message, index, user) => {
	// check if the sender of the current message is the same as the previus message
	return index > 0 && messages[index - 1]?.sender?._id === message?.sender?._id;
};
