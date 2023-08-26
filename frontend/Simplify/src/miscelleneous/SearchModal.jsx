import { useState } from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";

const SearchModal = ({ searchValue, handleSearch, handleSubmit }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<div className="bg-gray-300 rounded-full p-4">
				<RxMagnifyingGlass
					onClick={handleOpen}
					className="text-2xl font-bold hover:cursor-pointer"
				/>
			</div>

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
					<div className="absolute top-[30%] left-[20%] w-[350px] bg-white border-none outline-none p-4">
						<form className="relative">
							<input
								type="text"
								value={searchValue}
								onChange={handleSearch}
								placeholder="Search by title......"
								className="w-full border-b-2 border-gray-200 h-9 px-2 focus:outline-none focus:bg-transparent"
							/>
							<RxMagnifyingGlass
								onClick={handleSubmit}
								className="absolute top-2 right-1 bg-white text-xl hover:cursor-pointer"
							/>
						</form>
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default SearchModal;
