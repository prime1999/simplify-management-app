import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Backdrop, Modal, Fade, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { updateProject } from "../../features/Projects/ProjectSlice";

const UpdateProjectModal = ({
	setFetchProjectsAgain,
	fetchProjectsAgain,
	open,
	setOpen,
	project,
}) => {
	// for the menuItem
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);
	// for the form data
	const [value, setValue] = useState("pending");
	const [updatedData, setUpdatedData] = useState(null);
	const [formData, setformData] = useState({
		title: project.title,
		description: project.description,
		status: project.status,
		startDate: project.startDate,
		endDate: project.endDate,
	});

	// initialize the useDispatch hook
	const dispatch = useDispatch();
	// get the projects redux state from the redux store
	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.projects
	);
	// functions for the menuItem
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	// function to close modal
	const handleClose = () => {
		setOpen(false);
	};

	const { title, description, status, startDate, endDate } = formData;

	// for chooseing the task status
	const handleSelector = (value) => {
		setValue(value);
		setformData((prevState) => ({
			...prevState,
			status: value,
		}));
		setUpdatedData((prevState) => ({
			...prevState,
			status: value,
		}));
		handleCloseMenu();
	};

	// function to change the value of the title, description and due_date field to what is typed in by the user
	const handleChange = (e) => {
		setformData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
		setUpdatedData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && description && status && startDate && endDate && updatedData) {
			dispatch(updateProject({ projectId: project._id, updatedData }));
			setFetchProjectsAgain(!fetchProjectsAgain);
		} else {
			toast.error("No updated field");
		}
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
					<div className="absolute left-[30%] top-[20%] bg-white w-[500px] shadow-md px-4 py-8 outline-none">
						<h1 className="font-poppins font-bold text-2xl uppercase">
							Update Project
						</h1>
						<form onSubmit={handleSubmit} className="w-full mt-8 font-right">
							<input
								type="text"
								placeholder="project title"
								value={title}
								onChange={handleChange}
								id="title"
								className="w-full p-2 bg-white shadow-md focus:outline-none"
							/>
							<textarea
								placeholder="project description"
								value={description}
								onChange={handleChange}
								id="description"
								className="w-full my-4 p-2 bg-white shadow-md focus:outline-none"
							/>
							<div className="w-full flex items-end justify-between px-2">
								<div className="flex flex-col w-1/2">
									<label className="text-md text-gray-600">Start-date</label>
									<input
										type="date"
										value={startDate}
										onChange={handleChange}
										id="startDate"
										className="w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
									/>
								</div>
								<div className="flex flex-col w-1/2 mx-2">
									<label className="text-md text-gray-600">End-date</label>
									<input
										type="date"
										value={endDate}
										onChange={handleChange}
										id="endDate"
										className="w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
									/>
								</div>
								<div className="w-1/4">
									{/* menu starts */}
									<div className="flex flex-col">
										<h3>Status</h3>
										<div>
											<button
												type="button"
												id="fade-button"
												aria-controls={openMenu ? "fade-menu" : undefined}
												aria-haspopup="true"
												aria-expanded={openMenu ? "true" : undefined}
												onClick={handleClick}
												className="flex items-center justify-between font-right w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
											>
												{value}
												{anchorEl ? (
													<MdKeyboardArrowUp className="ml-2 hover:cursor-pointer" />
												) : (
													<MdKeyboardArrowDown className="ml-2 hover:cursor-pointer" />
												)}
											</button>
											<Menu
												id="fade-menu"
												MenuListProps={{
													"aria-labelledby": "fade-button",
												}}
												anchorEl={anchorEl}
												open={openMenu}
												onClose={handleCloseMenu}
												TransitionComponent={Fade}
											>
												<MenuItem onClick={() => handleSelector("in-progress")}>
													<p className="font-right">In-Progress</p>
												</MenuItem>
												<MenuItem onClick={() => handleSelector("completed")}>
													<p className="font-right">Completed</p>
												</MenuItem>
												<MenuItem onClick={() => handleSelector("pending")}>
													<p className="font-right">Pending</p>
												</MenuItem>
											</Menu>
										</div>
									</div>
									{/* menu ends */}
								</div>
							</div>
							<button
								type="submit"
								//disabled={isLoading ? true : false}
								className="w-full text-center py-2 bg-blue text-white font-right mt-4 text-lg hover:bg-secondaryBlue hover:rounded-lg hover:cursor-pointer"
							>
								Update
							</button>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default UpdateProjectModal;
