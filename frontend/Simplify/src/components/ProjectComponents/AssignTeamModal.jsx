import { useState, useEffect } from "react";
import { Modal, Fade, Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import { getTeams } from "../../features/Teams/TeamSlice";
import AddTeamModal from "./AddTeamModal";
import { assignTeam } from "../../features/Projects/ProjectSlice";

const AssignTeamModal = ({
	projectId,
	setFetchProjectsAgain,
	fetchProjectsAgain,
}) => {
	console.log(projectId);
	const [selectedTeam, setSeletedTeam] = useState(null);
	// stater for the modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const dispatch = useDispatch();
	const { teams, isLoading } = useSelector((state) => state.teams);

	useEffect(() => {
		dispatch(getTeams());
	}, []);

	const assignTeamToProject = (teamId, team) => {
		setFetchProjectsAgain(!fetchProjectsAgain);
		console.log(fetchProjectsAgain);
		dispatch(assignTeam({ teamId, projectId }));
		setSeletedTeam(team);
	};

	return (
		<>
			<div>
				<button
					onClick={handleOpen}
					className="font-right text-md text-navyBlue hover:text-blue"
				>
					assign to a team
				</button>
			</div>
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
						<div className="w-[500px] absolute top-[20%] left-[35%] bg-white shadow-md px-4 py-8">
							{teams ? (
								<>
									<div>
										<h2 className="font-poppins font-bold text-2xl text-center my-4">
											Pick a team from your teams
										</h2>
										{teams?.map((team) => (
											<div
												onClick={() => assignTeamToProject(team._id, team)}
												key={team._id}
												className={`py-2 px-4 shadow-md hover:cursor-pointer ${
													selectedTeam === team ? "border border-r-blue" : ""
												} `}
											>
												<h3 className="text-lg font-poppins font-bold uppercase">
													{team.name}
												</h3>
												<p>{team.description}</p>
											</div>
										))}
									</div>
								</>
							) : (
								<>
									<AddTeamModal>
										<h6 className="text-lg mb-2 font-poppins font-bold">
											You don't have a ready team
										</h6>
										<div className="bg-blue w-full text-center text-white p-2 text-2xl font-poppins hover:bg-secondaryBlue hover:ease-in-out duration-500">
											Create a team
										</div>
									</AddTeamModal>
								</>
							)}
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
};

export default AssignTeamModal;
