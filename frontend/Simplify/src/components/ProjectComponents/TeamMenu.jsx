import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineTeam, AiOutlinePlus } from "react-icons/ai";
import { getTeams } from "../../features/Teams/TeamSlice";
import AddTeamModal from "./AddTeamModal";
import CreateProjectModal from "./CreateProjectModal";
import ProjectSearchModal from "./ProjectSearchModal";

const TeamMenu = ({ setFetchProjectsAgain, fetchProjectsAgain }) => {
	// for the drwaer on mobile screen
	const isSmallerThanMd = useMediaQuery((theme) =>
		theme.breakpoints.down("md")
	);
	const [fetchTeamsAgain, setFetchTeamsAgain] = useState(false);
	// init te usedispatch function
	const dispatch = useDispatch();
	// get the teams details from the redux store (teams)
	const { teams, isLoading } = useSelector((state) => state.teams);
	useEffect(() => {
		dispatch(getTeams());
	}, [fetchTeamsAgain]);

	return (
		<>
			<div className="">
				<div className="flex justify-between items-center">
					<h1 className="text-4xl font-poppins font-bold">
						Active <span className="text-gray-400">Projects</span>
					</h1>
					<form className="relative">
						{isSmallerThanMd ? (
							<ProjectSearchModal />
						) : (
							<div>
								<input
									type="text"
									placeholder="Search..."
									className="w-72 px-2 py-1 font-poppins bg-gray-200 rounded-lg focus:outline-none"
								/>
								<RxMagnifyingGlass className="absolute top-2 right-2 text-lg" />
							</div>
						)}
					</form>
					<div
						className="rounded-full p-2 text-blue font-poppins font-semibold text-sm py-2 px-4 hover:bg-neonBlue"
						id="in_progress"
					>
						<CreateProjectModal
							setFetchProjectsAgain={setFetchProjectsAgain}
							fetchProjectsAgain={fetchProjectsAgain}
						/>
					</div>
				</div>
				<div className="flex items-center mt-4 font-poppins">
					<div className="flex items-center text-md text-blue font-semibold">
						<AiOutlineTeam className="text-lg font-bold" />
						<h2 className="ml-2">Created Teams</h2>
						<span className="bg-blue text-white px-2 rounded-md ml-2">
							{teams?.length}
						</span>
					</div>
					<div>
						<AddTeamModal
							fetchTeamsAgain={fetchTeamsAgain}
							setFetchTeamsAgain={setFetchTeamsAgain}
						>
							<div className="flex items-center bg-blue py-2 px-4 rounded-3xl ml-8 text-white hover:bg-secondaryBlue">
								<AiOutlinePlus className="text-lg font-bold" />{" "}
								<p className="text-sm ml-2">Add a new team</p>
							</div>
						</AddTeamModal>
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamMenu;
