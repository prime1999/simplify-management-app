import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Modal, Fade, Backdrop, Avatar } from "@mui/material";
import {
	getCompletedDate,
	getDateToStart,
	getDueDate,
	getFullDate,
} from "../../config/ProjectLogics";
import {
	getAssignedTeam,
	removeAssignedTeam,
} from "../../features/Teams/TeamSlice";

const ProjectDetailsModal = ({
	project,
	fetchProjectsAgain,
	setFetchProjectsAgain,
}) => {
	// state for the modal
	const [open, setOpen] = useState(false);

	// function to open the modal
	const handleOpen = () => {
		setOpen(true);
	};

	// function to close the modal
	const handleClose = () => {
		setOpen(false);
	};

	// init the dispatch function
	const dispatch = useDispatch();

	// get the project's assigned team details from the reduc store (teams)
	const { team, isLoading } = useSelector((state) => state.teams);

	// get the user details from the reduc store (auth)
	const { user } = useSelector((state) => state.auth);

	// the side effect to the assigned team from the team slice
	useEffect(() => {
		// dispatch the function to get the project's assigned team from the team slice
		dispatch(getAssignedTeam(project?._id));
	}, []);

	// function to remove the assigned team from a project
	const handleRemoveTeam = (teamId) => {
		// dispatch the function to remove the assigned team from the project
		// sending the team and project ids respectively as an argument
		dispatch(removeAssignedTeam({ teamId, projectId: project._id }));
		// fetch the projects again to refresh the projects data by changing the fetchProjectsAgain value
		setFetchProjectsAgain(!fetchProjectsAgain);
	};

	return (
		<>
			<button
				onClick={handleOpen}
				style={{
					backgroundColor: "rgba(240, 255, 255, 0.5)",
				}}
				className="text-sm text-blue font-bold px-2 py-1 rounded-md mb-4"
			>
				View
			</button>
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
						<div className="w-[500px] h-[600px] absolute top-[5%] left-[35%] bg-white rounded-md shadow-lg overflow-auto">
							<div className="p-8">
								<h1 className="text-2xl font-poppins font-bold uppercase">
									{project?.title}
								</h1>
								<div className="w-full mt-2">
									<p
										className="text-gray-500 font-poppins text-sm"
										style={{ wordBreak: "break-word" }}
									>
										{project?.description}
									</p>
								</div>
							</div>
							<hr className="border-1" />
							<div className="p-8 font-poppins">
								<h4>Start-Date</h4>
								<div className="flex items-center text-sm font-bold mt-2 mb-4 bg-gray-300 p-2 rounded-md">
									<BsFillCalendarDateFill className="mr-2" />
									<p>{getFullDate(project?.startDate)}</p>
								</div>
								<h4>End-Date</h4>
								<div className="flex items-center text-sm font-bold mt-2 bg-gray-300 p-2 rounded-md">
									<BsFillCalendarDateFill className="mr-2" />
									<p>{getFullDate(project?.endDate)}</p>
								</div>
								<div className="flex mt-8 text-sm font-bold bg-gray-300 p-2 rounded-md">
									{/* get the number of days since the project was completed if the project is completed */}
									{project?.status === "completed" ? (
										<p>
											Project completed {getCompletedDate(project?.endDate)}
										</p>
									) : (
										// get the number of days till project starts if project is yet to start
										<p>project {getDateToStart(project?.startDate)}</p>
									)}
									{/* get the days left till the end date if the project is in process */}
									{project?.status === "in-progress" && (
										<p className="ml-2">
											- {getDueDate(project.startDate, project.endDate)} left
											till end-date
										</p>
									)}
								</div>
							</div>
							<hr className="border-1" />
							<div className="px-8 pb-8 font-poppins">
								{project.team !== null ? (
									<div className="mt-8">
										<div className="text-md">
											<p>
												Project assigned to:{" "}
												<span className="text-blue font-right capitalize font-semiBold">
													{team?.map((team) => {
														return team.name;
													})}
												</span>
											</p>
										</div>
										<div className="mt-4 font-bold">
											<p>Team Members</p>
											<div>
												{project?.participants !== null && (
													<div>
														{project.participants.map((participant) => (
															<div key={participant._id}>
																<div className="flex items-center font-lato font-normal my-4 p-2">
																	<Avatar
																		alt={participant.name}
																		src={participant.pic}
																	/>
																	<div className="flex items-center justify-between w-full ml-2">
																		<div>
																			<h6 className="font-semibold capitalize">
																				{participant.name}
																			</h6>
																			<p className="text-sm text-gray-400">
																				{participant.email}
																			</p>
																		</div>
																		<h4 className="font-bold">
																			{participant._id === user.id
																				? "Team Leader"
																				: "Member"}
																		</h4>
																	</div>
																</div>
															</div>
														))}
														<div className="font-normal text-md mt-2">
															<h2>
																Are you not satisfied with the team and want to
																use a new team?
															</h2>
															<button
																onClick={() => handleRemoveTeam(team[0]._id)}
																className="text-white bg-secondaryBlue p-2 mt-2 rounded-lg hover:bg-blue"
															>
																Remove team
															</button>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								) : (
									<div className="mt-8 text-sm">
										<h3>This project is yet to be assigned to a team</h3>{" "}
										<p className="mt-2">
											Kindly close modal to assign and assign project to a team
										</p>
									</div>
								)}
							</div>
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
};

export default ProjectDetailsModal;
