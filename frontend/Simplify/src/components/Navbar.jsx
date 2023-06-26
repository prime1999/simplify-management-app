import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import { GiBookPile } from "react-icons/gi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { logout, reset } from "../features/Auth/AuthSlice";

const Navbar = () => {
  // for the menuItem
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // for the navigation
  const navigate = useNavigate();

  // for the logout function
  const dispatch = useDispatch();

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

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/getting-started");
    toast.success("User logged out");
  };

  return (
    <>
      <div className="w-11/12 mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GiBookPile className="text-blue text-3xl" />
            <h2 className="font-poppins font-bold text-3xl text-blue ml-2">
              SIMPLIFY
            </h2>
          </div>
          {/* <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between"
          >
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-96 bg-gray-100 h-9 px-2 rounded-md focus:outline-none"
              />
              <RxMagnifyingGlass className="absolute top-2 right-3 text-xl hover:cursor-pointer" />
            </div> */}
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
                Dashboard
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
          {/* </form> */}
          <div className="flex items-center justify-between">
            <div className="mr-8">
              <Badge color="primary" badgeContent={0} showZero>
                <BsBellFill className="text-xl" />
              </Badge>
            </div>
            <button
              onClick={onLogOut}
              className="bg-blue py-2 px-4 font-right text-white rounded-lg flex items-center"
            >
              Log-out <FiLogOut className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
