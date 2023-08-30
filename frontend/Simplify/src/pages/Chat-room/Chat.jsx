import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BsPeopleFill } from "react-icons/bs";
import SearchUsersModal from "../../components/chats/SearchUsersModal";
import { getUsersChats } from "../../features/Chats/ChatSlice";
import MyChat from "../../components/chats/MyChat";
import ChatBox from "../../components/chats/ChatBox";

const Chat = () => {
	const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
	// init the use dispatch function
	const dispatch = useDispatch();
	// for the search users modal
	const [open, setOpen] = useState(false);
	// function to open modal
	const handleOpen = () => {
		setOpen(true);
	};
	// function to close modal
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getUsersChats());
	}, [fetchChatsAgain]);
	return (
		<div className="">
			<div className="px-8">
				<button
					onClick={handleOpen}
					className="flex items-center font-right py-2 px-4 hover:bg-gray-200"
				>
					<RxMagnifyingGlass className="mr-2 text-lg" /> Search User
				</button>
			</div>
			{open && (
				<SearchUsersModal
					fetchChatsAgain={fetchChatsAgain}
					setFetchChatsAgain={setFetchChatsAgain}
					handleClose={handleClose}
					open={open}
				/>
			)}
			<div className="w-[97%] mx-auto h-screen flex">
				<MyChat
					fetchChatsAgain={fetchChatsAgain}
					setFetchChatsAgain={setFetchChatsAgain}
				/>
				<ChatBox />
			</div>
		</div>
	);
};

export default Chat;
