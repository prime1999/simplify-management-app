import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Spinner from "../components/Spinner";
import { getTask, updateTask, reset } from "../features/Tasks/TaskSlice";

const UpdateTask = () => {
	// get the task object from the redux store
	const { task, isLoading, isSuccess, message, isError } = useSelector(
		(state) => state.tasks
	);
	// get the id the task from the url params
	const { taskId } = useParams();
	// for the menuItem
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	// for the form data
	const [taskCreated, setTaskCreated] = useState(false);
	const [value, setValue] = useState("");
	const [checkedValue, setCheckedValue] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "",
		category: "",
		due_date: "",
	});
	const [updatedData, setUpdatedData] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// get the formData properties from the formData array
	const { title, description, status, category, due_date } = formData;

	// functions for the menuItem
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		setFormData((prevState) => ({
			...prevState,
			title: task?.title,
			description: task?.description,
			status: task?.status,
			category: task?.category,
			due_date: task?.due_date,
		}));
		setValue(task?.status);
		setCheckedValue(task?.category);
	}, [task]);

	// to get task based on id for updating
	useEffect(() => {
		dispatch(getTask(taskId));
	}, [dispatch]);

	// to run after the submit function as been carried out
	useEffect(() => {
		if (taskCreated) {
			toast.success("Task updated successfully");
			navigate("/tasks");
			dispatch(reset());
		}
		if (isError) {
			toast.error(message);
		}
		dispatch(reset());
		setTaskCreated(false);
	}, [taskCreated, isError, message, navigate, dispatch]);

	// for chooseing the task status
	const handleSelector = (value) => {
		setValue(value);
		setFormData((prevState) => ({
			...prevState,
			status: value,
		}));
		setUpdatedData((prevState) => ({
			...prevState,
			status: value,
		}));
		handleClose();
	};

	// for category checkbox
	const handleChecked = (e) => {
		const newValue = e.target.value;
		setCheckedValue(newValue);
		setFormData((prevState) => ({
			...prevState,
			category: checkedValue,
		}));
		setUpdatedData((prevState) => ({
			...prevState,
			category: newValue,
		}));
	};

	// function to change the value of the title, description and due_date field to what is typed in by the user
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
		setUpdatedData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to submit the task
	const handleSubmit = (e) => {
		e.preventDefault();
		if (title || description || due_date || category) {
			dispatch(updateTask({ updatedData: updatedData, id: taskId }));
			if (isSuccess) {
				setTaskCreated(true);
			}
			dispatch(reset());
		}
	};

	// to return a spinner if isLoading is true
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="w-7/12 mx-auto my-16">
				<h1 className="font-poppins font-bold text-4xl">
					Create <br /> New Task
				</h1>
				{title && (
					<form onSubmit={handleSubmit} className="w-full mt-8 font-right">
						<input
							type="text"
							placeholder="task title"
							value={title}
							onChange={handleChange}
							id="title"
							className="w-full p-2 bg-white shadow-md focus:outline-none"
						/>
						<textarea
							placeholder="task description"
							value={description}
							onChange={handleChange}
							id="description"
							className="w-full my-4 p-2 bg-white shadow-md focus:outline-none"
						/>
						<div className="w-full flex items-end justify-between px-2">
							<div className="flex flex-col w-1/2">
								<label className="text-md text-gray-600">Due-date</label>
								<input
									type="date"
									value={due_date}
									onChange={handleChange}
									id="due_date"
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
											aria-controls={open ? "fade-menu" : undefined}
											aria-haspopup="true"
											aria-expanded={open ? "true" : undefined}
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
											open={open}
											onClose={handleClose}
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
							{/* category check-list starts */}
						</div>
						<div className="mt-8">
							<h4 className="">Category</h4>
							<div className="flex items-center justify-between my-4">
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "home"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="home"
									>
										Home
									</label>
									<input
										type="checkbox"
										checked={checkedValue === "home"}
										onChange={handleChecked}
										value="home"
										className="hidden"
										id="home"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "work"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="work"
									>
										Work
									</label>
									<input
										type="checkbox"
										value="work"
										checked={checkedValue === "work"}
										onChange={handleChecked}
										className="hidden"
										id="work"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "family"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="family"
									>
										Family
									</label>
									<input
										type="checkbox"
										value="family"
										checked={checkedValue === "family"}
										onChange={handleChecked}
										className="hidden"
										id="family"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "personal"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="personal"
									>
										Personal
									</label>
									<input
										type="checkbox"
										value="personal"
										checked={checkedValue === "personal"}
										onChange={handleChecked}
										className="hidden"
										id="personal"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "education"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="education"
									>
										Education
									</label>
									<input
										type="checkbox"
										value="education"
										checked={checkedValue === "education"}
										onChange={handleChecked}
										className="hidden"
										id="education"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between mt-8">
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "social"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="social"
									>
										Social
									</label>
									<input
										type="checkbox"
										value="social"
										checked={checkedValue === "social"}
										onChange={handleChecked}
										className="hidden"
										id="social"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "travel"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="travel"
									>
										Travel
									</label>
									<input
										type="checkbox"
										value="travel"
										checked={checkedValue === "travel"}
										onChange={handleChecked}
										className="hidden"
										id="travel"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "financial"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="financial"
									>
										Financial
									</label>
									<input
										type="checkbox"
										value="financial"
										checked={checkedValue === "financial"}
										onChange={handleChecked}
										className="hidden"
										id="financial"
									/>
								</div>
								<div>
									<label
										className={`px-4 py-2 rounded-2xl shadow-lg duration-500 ease-in-out hover:bg-blue hover:text-white hover:cursor-pointer ${
											checkedValue === "miscellaneous"
												? "bg-blue text-white"
												: "bg-white"
										}`}
										htmlFor="miscellaneous"
									>
										Miscellaneous
									</label>
									<input
										type="checkbox"
										value="miscellaneous"
										checked={checkedValue === "miscellaneous"}
										onChange={handleChecked}
										className="hidden"
										id="miscellaneous"
									/>
								</div>
							</div>
						</div>
						{/* category check-list ends */}
						<button className="w-full text-center py-2 bg-blue text-white font-right mt-8 text-lg hover:bg-secondaryBlue hover:rounded-lg">
							Add Task
						</button>
					</form>
				)}
			</div>
		</>
	);
};

export default UpdateTask;
