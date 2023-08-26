import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdOutlineTaskAlt, MdOutlineExplore } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { LuMessagesSquare } from "react-icons/lu";
import { GoProject } from "react-icons/go";
import { BiTimer } from "react-icons/bi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import { getTasks } from "../features/Tasks/TaskSlice";
import MobileScreenDrawer from "./MobileScreenDrawer";

const drawerWidth = 240;

const RootLayout = () => {
	// for the drwaer on mobile screen
	const isSmallerThanMd = useMediaQuery((theme) =>
		theme.breakpoints.down("md")
	);
	// for the drawer
	const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
	const [path, setPath] = useState("");
	const dispatch = useDispatch();
	// get the tasks state from the task redux store
	const { tasks } = useSelector((state) => state.tasks);
	// get the current url location of the page
	const location = useLocation();
	useEffect(() => {
		// split the url into different using the /
		const pathSegments = location.pathname
			.split("/")
			.filter((segment) => segment !== "");
		// get the tasks string from the url
		const tasksPath = pathSegments[0];
		// make the task string capitalized if there is a tasksPath
		const path = tasksPath
			? `${tasksPath.charAt(0).toUpperCase()}${tasksPath.slice(1)}`
			: "";
		setPath(path);
	});

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	// function to open the mobile drawer
	const handleOpenMobileDrawer = () => {
		setOpenMobileDrawer(true);
	};

	// function to close the mobile drawer
	const handleCloseMobileDrawer = () => {
		setOpenMobileDrawer(false);
	};
	return (
		<>
			<div>
				<div className="flex">
					{isSmallerThanMd && (
						<div className="fixed top-2 left-3 bg-gray-50 p-2 text-2xl mb-8 hover:cursor-pointer">
							<AiOutlineMenuUnfold onClick={handleOpenMobileDrawer} />
						</div>
					)}
					{!isSmallerThanMd ? (
						<>
							<Drawer
								sx={{
									width: drawerWidth,
									flexShrink: 0,
									"& .MuiDrawer-paper": {
										width: drawerWidth,
										boxSizing: "border-box",
										border: "none",
										boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
										background: "none",
									},
								}}
								variant="permanent"
								anchor="left"
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
								</div>
							</Drawer>
						</>
					) : (
						<>
							<MobileScreenDrawer
								path={path}
								openMobileDrawer={openMobileDrawer}
								handleCloseMobileDrawer={handleCloseMobileDrawer}
								handleOpenMobileDrawer={handleOpenMobileDrawer}
							/>
						</>
					)}
					<div
						style={{
							width: !isSmallerThanMd
								? `calc(100% - ${drawerWidth}px)`
								: "100%",
							ml: isSmallerThanMd ? `${drawerWidth}px` : "0px",
							marginTop: "20px",
						}}
					>
						<Navbar />
						<Outlet />
						{path === "chat" ? (
							<Footer />
						) : (
							// for chats footer
							<>
								<div>
									<h4 className="text-center text-md text-darkGray mt-16">
										&copy; 2023 EMINENCE, All rights reserved
									</h4>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default RootLayout;
