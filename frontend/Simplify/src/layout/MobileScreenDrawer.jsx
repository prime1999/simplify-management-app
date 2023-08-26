import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material/";
import { toast } from "react-toastify";
import { MdOutlineTaskAlt, MdOutlineExplore } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { LuMessagesSquare } from "react-icons/lu";
import { GoProject } from "react-icons/go";
import { BiTimer } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { logout, reset } from "../features/Auth/AuthSlice";

const MobileScreenDrawer = ({
	path,
	openMobileDrawer,
	handleOpenMobileDrawer,
	handleCloseMobileDrawer,
}) => {
	const dispatch = useDispatch();
	// get the tasks state from the task redux store
	const { tasks } = useSelector((state) => state.tasks);

	const navigate = useNavigate();

	const onLogOut = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/getting-started");
		toast.success("User logged out");
	};
	return (
		<>
			<SwipeableDrawer
				anchor="left"
				open={openMobileDrawer}
				onClose={handleCloseMobileDrawer}
				onOpen={handleOpenMobileDrawer}
			>
				<div className="py-4">
					<div>
						<h1 className="flex items-center font-poppins my-8 mx-8 font-bold text-black text-3xl">
							<MdOutlineExplore className="mr-2 text-secondaryBlue" />
							{path ? path : "Explore"}
						</h1>
						<hr />
						<div className="mt-16 px-8 font-right text-md text-gray-800">
							<div className="flex items-center duration-500 hover:text-gray-300">
								<MdOutlineTaskAlt />{" "}
								<Link
									to="/tasks"
									className="flex items-center justify-between ml-2"
								>
									Tasks
									<p className="ml-2 bg-blue px-2 text-white rounded-lg">
										{tasks ? tasks.length : 0}
									</p>
								</Link>
							</div>
							<div className="flex items-center mt-8 duration-500 hover:text-gray-300">
								<GoProject />{" "}
								<Link to="/projects" className="ml-2">
									Projects
								</Link>
							</div>
							<div className="flex items-center mt-8 duration-500 hover:text-gray-300">
								<LuMessagesSquare />{" "}
								<Link to="/chat" className="ml-2">
									Chat-room
								</Link>
							</div>
							<div className="flex items-center mt-8 duration-500 hover:text-gray-300">
								<BiTimer />{" "}
								<Link to="/time-tracker" className="ml-2">
									Time Tracker
								</Link>
							</div>
							<div className="flex items-center mt-8 duration-500 hover:text-gray-300">
								<SiGoogleanalytics />{" "}
								<Link to="/analytics" className="ml-2">
									Analytics
								</Link>
							</div>
						</div>
					</div>
					<div className="p-8 mt-16">
						<button
							onClick={onLogOut}
							className="flex items-center py-2 px-4 rounded-md font-poppins bg-blue text-white hover:bg-secondaryBlue"
						>
							<FiLogOut /> <p className="ml-4">Log-out</p>
						</button>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	);
};

export default MobileScreenDrawer;
