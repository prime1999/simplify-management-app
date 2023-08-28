export const getOtherUser = (chat, currentUser) => {
	const user = chat.users.filter((user) => user._id !== currentUser.id);

	return user[0];
};
