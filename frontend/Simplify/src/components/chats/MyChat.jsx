import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import ChatLoading from "./ChatLoading";
import { getOtherUser } from "../../config/ChatLogic";
import groupPic from "../../assets/images/png/download.png";
import { setSelectedChat } from "../../features/Chats/ChatSlice";

const MyChat = ({ fetchChatsAgain, setFetchChatsAgain }) => {
	const dispatch = useDispatch();
	// get the user chats from the redux store
	const { chats, selectedChat, isLoading } = useSelector(
		(state) => state.chats
	);
	// get the user details from the redux store
	const { user } = useSelector((state) => state.auth);

	const handleChat = (chat) => {
		dispatch(setSelectedChat(chat));
		console.log(selectedChat);
	};

	return (
		<div className="w-[500px] p-4">
			<div className="h-full overflow-auto">
				{isLoading ? (
					<ChatLoading />
				) : (
					<>
						{chats?.map((chat) => (
							<div
								onClick={() => handleChat(chat)}
								key={chat._id}
								className={`${
									selectedChat === chat && "border-l-4 border-blue"
								} flex items-center mt-2 bg-white w-11/12 px-4 py-2 duration-500 hover:cursor-pointer hover:border-l-4 hover:border-blue`}
							>
								{chat?.isGroupChat ? (
									<Avatar src={groupPic} />
								) : (
									<Avatar src={getOtherUser(chat, user).pic} />
								)}
								<div className="ml-4 font-right text-md capitalize">
									{chat?.isGroupChat ? (
										<h3>{chat?.chatName}</h3>
									) : (
										<h3>{getOtherUser(chat, user).name}</h3>
									)}
									{/* the latest message of the chat */}
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default MyChat;
