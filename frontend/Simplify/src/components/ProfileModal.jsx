import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Backdrop, Fade, Avatar } from "@mui/material";

const ProfileModal = ({ children }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { user, isLoading } = useSelector((state) => state.auth);
	return (
		<div>
			{children && (
				<button onClick={handleOpen} className="flex items-center">
					{children}
				</button>
			)}
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
					<div className="absolute top-[15%] left-[33%] w-[500px] bg-white shadow-lg py-4">
						<div className="">
							<h4 className="px-4 py-2 font-poppins font-bold">Profile</h4>
							<hr />
							<div className="flex items-center justify-center my-8">
								<div className="text-center">
									<Avatar
										sx={{
											width: "120px",
											height: "120px",
											border: "5px solid lightGray",
										}}
										src={user?.pic}
									/>
									<h2 className="uppercase font-poppins font-bold text-2xl mt-2">
										{user?.name}
									</h2>
									<p className="text-gray-400 font-right">{user?.email}</p>
								</div>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default ProfileModal;
