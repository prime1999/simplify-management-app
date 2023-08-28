import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { GrAttachment } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";
import groupPic from "../../assets/images/png/download.png";
import { getOtherUser } from "../../config/ChatLogic";
import {
	fetchMessages,
	sendMessage,
} from "../../features/Message/MessageSlice";

const SingleChat = () => {
	const dispatch = useDispatch();
	const { chats, selectedChat } = useSelector((state) => state.chats);
	const { messages, isLoading } = useSelector((state) => state.messages);
	const { user } = useSelector((state) => state.auth);

	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		dispatch(fetchMessages(selectedChat._id));
	}, [selectedChat]);
	console.log(messages);

	// function to run when the user is typing
	const typingHandler = (e) => {
		setNewMessage(e.target.value);
	};

	// function to run when the user submits a message
	const handleSubmit = (e, chatId) => {
		e.preventDefault();

		if (newMessage) {
			dispatch(sendMessage({ chatId, content: newMessage }));
		}
		setNewMessage("");
	};
	return (
		<>
			<div className="flex items-center">
				{selectedChat?.isGroupChat ? (
					<Avatar src={groupPic} />
				) : (
					<Avatar src={getOtherUser(selectedChat, user).pic} />
				)}
				<div className="ml-4 font-right text-md capitalize">
					{selectedChat?.isGroupChat ? (
						<h3>{selectedChat?.chatName}</h3>
					) : (
						<h3>{getOtherUser(selectedChat, user).name}</h3>
					)}
					{/* to know if user is online or not */}
				</div>
			</div>
			<form
				onSubmit={(e) => handleSubmit(e, selectedChat._id)}
				className="absolute bottom-0 w-full flex justify-center my-2"
			>
				<div className="w-10/12">
					<hr />
					<div className="flex items-center w-full">
						<GrAttachment className="mt-2" />
						<input
							className="w-full pl-4 mt-2 bg-transparent focus:outline-none"
							type="text"
							value={newMessage}
							onChange={typingHandler}
							placeholder="write a message"
						/>
						<div
							onClick={(e) => handleSubmit(e, selectedChat._id)}
							className="bg-blue p-2 rounded-full mt-2 text-white hover:cursor-pointer"
						>
							<BsFillSendFill />
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default SingleChat;
