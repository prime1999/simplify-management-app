import { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@mui/material";
import { getFullDate } from "../../config/ProjectLogics";
import AssignTeamModal from "./AssignTeamModal";
import DeleteProjectModal from "./DeleteProjectModal";
import UpdateProjectModal from "./UpdateProjectModal";

const InProgressProject = ({
	in_progress,
	setFetchProjectsAgain,
	fetchProjectsAgain,
}) => {
	// state for project delete modal
	const [open, setOpen] = useState(false);

	// state for project update modal
	const [openUpdateModal, setOpenUpdateModal] = useState(false);

	// function to open delete project modal
	const handleOpen = () => {
		setOpen(true);
	};

	// function to open update project modal
	const handleOpenUpdateModal = () => {
		setOpenUpdateModal(true);
	};
	return (
		<div>
			{in_progress.length !== 0 &&
				in_progress?.map((project) => (
					<div
						key={project._id}
						className="font-poppins mb-2 bg-gray-200 p-4 rounded-md"
					>
						<div className="flex justify-between">
							<button
								style={{
									backgroundColor: "rgba(240, 255, 255, 0.5)",
								}}
								className="text-sm text-blue font-bold px-2 py-1 rounded-md mb-4"
							>
								View
							</button>
							<div className="flex">
								<BsTrash3Fill
									onClick={handleOpen}
									className="text-md text-blue hover:cursor-pointer"
								/>
								<BiEdit
									onClick={handleOpenUpdateModal}
									className="text-md text-blue ml-2 hover:cursor-pointer"
								/>
							</div>
						</div>
						<h2 className="text-lg capitalize font-bold text-navyBlue">
							{project?.title}
						</h2>
						<p className="font-lato text-secondaryBlue font-semibold">
							{project?.description}
						</p>
						<div className="mt-4 text-sm font-right text-blue bg-white w-28 rounded-lg p-2">
							{getFullDate(project?.startDate)}
						</div>
						<div className="mt-4 flex justify-between items-center">
							{project.participants !== null ? (
								<AvatarGroup max={project.participants.length}>
									{project.participants.map((participant) => (
										<Avatar
											key={participant._id}
											alt={participant.name}
											src={participant.pic}
										/>
									))}
								</AvatarGroup>
							) : (
								<div>
									<AssignTeamModal
										fetchProjectsAgain={fetchProjectsAgain}
										setFetchProjectsAgain={setFetchProjectsAgain}
										projectId={project._id}
									/>
								</div>
							)}
							<div className="text- font-right text-blue hover:text-secondaryBlue ">
								<Link>Team Chat</Link>
							</div>
						</div>
						{open && (
							<DeleteProjectModal
								open={open}
								setOpen={setOpen}
								project={project}
							/>
						)}
						{openUpdateModal && (
							<UpdateProjectModal
								fetchProjectsAgain={fetchProjectsAgain}
								setFetchProjectsAgain={setFetchProjectsAgain}
								open={openUpdateModal}
								setOpen={setOpenUpdateModal}
								project={project}
							/>
						)}
					</div>
				))}
		</div>
	);
};

export default InProgressProject;
