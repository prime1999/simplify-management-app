import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import SearchUsersModal from "./SearchUsersModal";

const MyChat = () => {
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
	return (
		<div className="w-1/3 p-4">
			<div className="">
				<button
					onClick={handleOpen}
					className="flex items-center font-right py-2 px-4 hover:bg-gray-200"
				>
					<RxMagnifyingGlass className="mr-2 text-lg" /> Search User
				</button>
			</div>
			{open && <SearchUsersModal handleClose={handleClose} open={open} />}
		</div>
	);
};

export default MyChat;
