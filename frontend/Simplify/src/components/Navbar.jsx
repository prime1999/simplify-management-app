import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { GiBookPile } from "react-icons/gi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { logout, reset } from "../features/Auth/AuthSlice";
import { Avatar } from "@mui/material";

const Navbar = () => {
  // for the menuItem
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // for the navigation
  const navigate = useNavigate();

  // for the logout function
  const dispatch = useDispatch();

  // get the user info from the redux store
  const { user } = useSelector((state) => state.auth);

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
            <Link to="/">
              <h2 className="font-poppins font-bold text-3xl text-blue ml-2">
                SIMPLIFY
              </h2>
            </Link>
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
              <Tooltip
                title="Profile"
                style={{ backgroundColor: "transparent" }}
              >
                <IconButton>
                  <Link to="/profile" className="flex items-center">
                    <Avatar alt="user pic" src={user?.pic} />
                    <p className="font-poppins ml-2 text-[17px] text-black">
                      {user?.name}
                    </p>
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
            <div className="mr-8">
              <Tooltip
                title="Notifications"
                style={{ backgroundColor: "transparent" }}
              >
                <IconButton>
                  <Badge color="neon" badgeContent={0} showZero>
                    <BsBellFill className="text-xl text-black" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
            <button
              onClick={onLogOut}
              className="bg-blue py-2 px-4 font-right text-white rounded-lg flex items-center hover:bg-secondaryBlue"
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
