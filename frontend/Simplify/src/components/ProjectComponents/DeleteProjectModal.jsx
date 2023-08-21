import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { deleteProject } from "../../features/Projects/ProjectSlice";

const DeleteProjectModal = ({ open, setOpen, project }) => {
	// funcion to close modal
	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();
	// get the isSuccess property from the redux store named projects
	const { isSuccess, isError, message } = useSelector(
		(state) => state.projects
	);
	// function to delete the project
	const handleDelete = (id) => {
		console.log("test");
		// dispatch the delete project function with the task id an an argument
		dispatch(deleteProject(id));
		// if the dispatch is successful then let the user know
		if (isSuccess) {
			toast.info("Project has been deleted");
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
					<div className="absolute top-1/4 right-1/2 w-96 translate-x-1/2 translate-y-1/2 p-8 rounded-lg shadow-lg bg-white text-black outline-none">
						<p id="transition-modal-title" variant="h6" component="h2">
							Remove{" "}
							<span className="font-bold uppercase">{project.title}</span>
						</p>
						<p id="transition-modal-description" sx={{ mt: 2 }}>
							Are you sure, Once deleted cannont be retrieved
						</p>
						<div className="flex items-center justify-between font-lato font-bold text-sm mt-4">
							<button
								onClick={() => handleDelete(project._id)}
								className="bg-green-600 text-white py-2 px-2 rounded-xl hover:bg-green-500"
							>
								Yes, Delete it
							</button>
							<button
								onClick={handleClose}
								className="bg-red-600 text-white py-2 px-2 rounded-xl hover:bg-red-500"
							>
								Cancel
							</button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default DeleteProjectModal;
