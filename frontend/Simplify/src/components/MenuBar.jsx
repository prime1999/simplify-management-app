import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { RxMagnifyingGlass } from "react-icons/rx";

const MenuBar = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const tasksPath = pathSegments[0];

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-4xl font-poppins font-bold">
          Active{" "}
          <span className="text-gray-500">{tasksPath.toUpperCase()}</span>
        </h1>{" "}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between"
        >
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-96 bg-white h-9 px-2 rounded-md focus:outline-none focus:border-b-2 focus:border-navyBlue focus:bg-transparent"
            />
            <RxMagnifyingGlass className="absolute top-2 right-3 text-xl hover:cursor-pointer" />
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
      <div className="mt-4 text-md font-lato font-semibold text-gray-500">
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
