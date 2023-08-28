import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Fade, Backdrop, Avatar } from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";
import { searchUser } from "../../features/Auth/AuthSlice";
import { accessChat, setSelectedChat } from "../../features/Chats/ChatSlice";

const SearchUsersModal = ({
	open,
	handleClose,
	fetchChatsAgain,
	setFetchChatsAgain,
}) => {
	const [user, setUser] = useState("");
	// init the dispatch function
	const dispatch = useDispatch();
	const { users, userList, isLoading, isSuccess } = useSelector(
		(state) => state.auth
	);

	const handleSearch = (e) => {
		e.preventDefault();
		// check if a user name/email was input to search
		if (!user) {
			return;
		}
		// dispatch the search users function in the auth slice with the user name/email passed as an argument
		dispatch(searchUser(user));
	};

	const handleFunction = (userId) => {
		dispatch(accessChat(userId));
		setFetchChatsAgain(!fetchChatsAgain);
		handleClose();
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<div className="w-[500px] font-poppins absolute top-[20%] left-[35%] bg-white shadow-md px-4 py-8">
						<h1 className="text-xl font-bold">Search Users</h1>
						<form onSubmit={handleSearch}>
							<div className="relative mt-4">
								<input
									type="text"
									placeholder="Search user by name/email"
									value={user}
									onChange={(e) => setUser(e.target.value)}
									className="w-full h-10 border-b border-gray-400 px-2 pl-8 focus:outline-none"
								/>
								<RxMagnifyingGlass
									onClick={handleSearch}
									className="absolute left-2 top-3 text-gray-400 text-lg"
								/>
							</div>
						</form>
						<div className="mt-8 p-4 h-[300px] overflow-auto">
							{users &&
								users.map((user) => (
									<div
										key={user._id}
										onClick={() => handleFunction(user._id)}
										className="flex items-center mt-4 shadow-md p-4 hover:cursor-pointer"
									>
										<Avatar alt="Remy Sharp" src={user.pic} />
										<div className="ml-4">
											<h4 className="text-md">{user.name}</h4>
											<p className="text-sm text-gray-300">{user.email}</p>
										</div>
									</div>
								))}
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default SearchUsersModal;
