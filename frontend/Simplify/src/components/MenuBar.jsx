import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { RxMagnifyingGlass } from "react-icons/rx";

const MenuBar = () => {
  // for the menuItem
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // functions for the menuItem
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelector = (e) => {
    const selectedValue = e.currentTarget.getAttribute("data-value");
    console.log(selectedValue);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const tasksPath = pathSegments[0];
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
          {/* menu starts */}
          {/* <div>
            <button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="flex items-center font-right"
            >
              Category
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
              <MenuItem onClick={handleSelector} data-value="tasks">
                <p className="font-right">Tasks</p>
              </MenuItem>
              <MenuItem onClick={handleSelector} data-value="projects">
                <p className="font-right">Projects</p>
              </MenuItem>
              <MenuItem onClick={handleSelector} data-value="clients">
                <p className="font-right">Clients</p>
              </MenuItem>
            </Menu>
          </div> */}
          {/* menu ends */}
        </form>
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
