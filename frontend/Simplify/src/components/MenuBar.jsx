import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BsPlus } from "react-icons/bs";
import { RxMagnifyingGlass } from "react-icons/rx";
import { searchTask } from "../features/Tasks/TaskSlice";
import SearchModal from "../miscelleneous/SearchModal";

const MenuBar = () => {
	// for the drwaer on mobile screen
	const isSmallerThanMd = useMediaQuery((theme) =>
		theme.breakpoints.down("md")
	);
	const { tasks } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState("");
	// get the current url location of the page
	const location = useLocation();
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

	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const value = searchValue.toLowerCase();
		dispatch(searchTask(value));
	};

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<h1 className="text-black text-4xl font-poppins font-bold">
					Active <span className="text-gray-500">{path}</span>
				</h1>{" "}
				<form
					onSubmit={handleSubmit}
					className="flex items-center justify-between"
				>
					<div className="relative mr-4">
						{isSmallerThanMd ? (
							<>
								<SearchModal
									searchValue={searchValue}
									handleSearch={handleSearch}
									handleSubmit={handleSubmit}
								/>
							</>
						) : (
							<>
								<input
									type="text"
									value={searchValue}
									onChange={handleSearch}
									placeholder="Search by title......"
									className="w-96 bg-white h-9 px-2 rounded-md focus:outline-none focus:border-b-2 focus:border-navyBlue focus:bg-transparent"
								/>
								<RxMagnifyingGlass
									onClick={handleSubmit}
									className="absolute top-2 right-3 text-xl hover:cursor-pointer"
								/>
							</>
						)}
					</div>
				</form>
				<div
					className="rounded-full p-2 text-blue font-poppins font-semibold text-sm hover:bg-neonBlue"
					style={{ backgroundColor: "rgba(162, 162, 255, 0.5)" }}
					id="in_progress"
				>
					<Link to="/add-task" className="flex items-center justify-between">
						<BsPlus /> <p>Add {tasksPath}</p>
					</Link>
				</div>
			</div>
			<hr className="mt-4" />
			<div className="mt-4 text-md font-lato font-semibold text-gray-500 hidden md:flex">
				<ul className="w-9/12 flex items-center justify-between">
					<li className="hover:text-black">
						<Link to="/tasks/category/personal">Personal</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/work">Work</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/home">Home</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/family">Family</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/education">Education</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/social">Social</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/travel">Travel</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/financial">Financial</Link>
					</li>
					<li className="hover:text-black">
						<Link to="/tasks/category/miscellaneous">Miscelaneous</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MenuBar;
