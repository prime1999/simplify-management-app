import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { GrAttachment } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";
import groupPic from "../../assets/images/png/download.png";
import { getOtherUser } from "../../config/ChatLogic";
import {
	addNewMessage,
	fetchMessages,
	sendMessage,
} from "../../features/Message/MessageSlice";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = () => {
	const dispatch = useDispatch();
	const [socketConnected, setSocketConnected] = useState(false);
	const [messageSent, setMessageSent] = useState(false);
	const { chats, selectedChat } = useSelector((state) => state.chats);
	const { messages, NewMessage, isLoading } = useSelector(
		(state) => state.messages
	);
	const { user } = useSelector((state) => state.auth);

	const [newMessage, setNewMessage] = useState("");
	const [typing, setTyping] = useState(false);

	useEffect(() => {
		// connect to socket once user open a chat
		socket = io(ENDPOINT);
		// emit a socket to the backend to add a user to a private room
		socket.emit("set-up", user);
		// listen to a socket from the backend to know if user has joined the rivate room succesfully
		socket.on("connected", () => {
			setSocketConnected(true);
		});
		// listen to the socket event to indicate that a user is typing
		socket.on("typing", () => setTyping(true));
		// listen to the socket event to indicate that a user has stopped typing
		socket.on("stop typing", () => setTyping(false));
	}, []);

	useEffect(() => {
		dispatch(fetchMessages(selectedChat._id));
		// emit a socket request to the backend for the user to join the selected chat
		socket.emit("join chat", selectedChat._id);
		// save the selected chat in to the selectedChatCompare variable
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	// function to run when the user is typing
	const typingHandler = (e) => {
		setNewMessage(e.target.value);

		if (!socketConnected) return;

		if (!typing) {
			setTyping(true);
			socket.emit("typing", selectedChat._id);
		}

		let currentTime = new Date().getTime();
		let indicatorDuration = 3000;

		setTimeout(() => {
			let typingTime = new Date().getTime();
			let timeDiff = typingTime - currentTime;

			if (timeDiff >= indicatorDuration && !typing) {
				socket.emit("stop typing", selectedChat._id);
				setTyping(false);
			}
		}, 3000);
	};

	// function to run when the user submits a message
	const handleSubmit = (e, chatId) => {
		e.preventDefault();

		if (newMessage) {
			dispatch(sendMessage({ chatId, content: newMessage }));
		}
		setNewMessage("");
	};

	useEffect(() => {
		if (NewMessage) {
			setMessageSent(!messageSent);
			socket.emit("new message", NewMessage);
		}
	}, [NewMessage]);

	useEffect(() => {
		socket.on("message received", (newMessageReceived) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newMessageReceived.chat._id
			) {
				// show notification
				console.log(13);
			} else {
				dispatch(addNewMessage(newMessageReceived));
				console.log(newMessageReceived);
			}
		});
		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("message received");
		};
	}, [messageSent]);

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
			<div className="relative h-[85%] w-full p-2 mt-2">
				<ScrollableChat />
				{typing && "typing"}
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
