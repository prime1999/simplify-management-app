import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleChat from "./SingleChat";

const ChatBox = () => {
	const { selectedChat } = useSelector((state) => state.chats);
	console.log(selectedChat);

	return (
		<div className="relative w-full h-screen px-4">
			{selectedChat ? (
				<SingleChat />
			) : (
				<div className="flex items-center justify-center h-full">
					<h1 className="text-4xl text-gray-200">No Selected Chat</h1>
				</div>
			)}
		</div>
	);
};

export default ChatBox;
