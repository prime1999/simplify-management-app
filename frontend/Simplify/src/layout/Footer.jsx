import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GiBookPile } from "react-icons/gi";
import {
	BsFacebook,
	BsInstagram,
	BsTwitter,
	BsLinkedin,
	BsYoutube,
} from "react-icons/bs";

const Footer = () => {
	const [path, setPath] = useState("");
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
	console.log(path);
	return (
		<>
			{path !== "Chat" ? (
				<footer
					className="p-16 font-lato mt-16"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
				>
					<>
						<div className="flex justify-between flex-col flex-wrap w-full md:flex-row">
							<div className="flex justify-between w-[600px]">
								<div className="w-1/3">
									<div className="">
										<Link className="flex items-center" to="/">
											<GiBookPile className="text-blue text-3xl" />
											<h2 className="font-poppins font-bold text-3xl text-blue ml-2">
												SIMPLIFY
											</h2>
										</Link>
									</div>
									<p className="text-md mt-4 font-semibold">
										We will give you the easiet way to manage your day to day
										activities
									</p>
									<ul className="flex items-center mt-16">
										<li className="mr-4">
											<BsFacebook />
										</li>
										<li className="mr-4">
											<BsTwitter />
										</li>
										<li className="mr-4">
											<BsLinkedin />
										</li>
										<li className="mr-4">
											<BsInstagram />
										</li>
										<li className="">
											<BsYoutube />
										</li>
									</ul>
								</div>
								<div className="w-[300px] flex items-center justify-between flex-col md:flex-row">
									<div>
										<h3 className="font-bold text-lg mb-4">Company</h3>
										<ul className="flex flex-col">
											<Link className="mb-2">Home</Link>
											<Link className="mb-2">About</Link>
											<Link className="mb-2">Features</Link>
											<Link className="mb-2">Blog</Link>
										</ul>
									</div>
									<div>
										<h3 className="font-bold text-lg mb-4">Information</h3>
										<ul className="flex flex-col">
											<Link className="mb-2">Privacy Policy</Link>
											<Link className="mb-2">Terms of Service</Link>
											<Link className="mb-2">FAQ</Link>
											<Link className="mb-2">Support Center</Link>
										</ul>
									</div>
								</div>
							</div>
							{/* mailing center */}
							<div className="w-[300px] ml-16 mt-8 font-lato md:mt-0">
								<h3 className="font-bold mb-8 text-xl text-black">
									Join Our Maling List
								</h3>
								<form className="relative w-[300px]">
									<input
										type="email"
										placeholder="Enter your Email"
										className="w-full bg-white h-12 px-2 rounded-lg focus:outline-none"
									/>
									<button className="absolute top-1 right-1 bg-blue px-4 py-2 text-white font-bold rounded-2xl hover:bg-secondaryBlue">
										Join
									</button>
								</form>
							</div>
						</div>
						<h4 className="text-center text-md text-darkGray mt-16">
							&copy; 2023 EMINENCE, All rights reserved
						</h4>
					</>
				</footer>
			) : (
				<div>
					<h4 className="text-center text-md text-darkGray my-4">
						&copy; 2023 EMINENCE, All rights reserved
					</h4>
				</div>
			)}
		</>
	);
};

export default Footer;
