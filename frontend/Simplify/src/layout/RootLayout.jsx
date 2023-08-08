import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Navbar from "../components/Navbar";
import { MdOutlineTaskAlt, MdOutlineExplore } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { LuMessagesSquare } from "react-icons/lu";
import { GoProject } from "react-icons/go";
import { BiTimer } from "react-icons/bi";
import Footer from "../components/Footer";
import { getTasks } from "../features/Tasks/TaskSlice";

const drawerWidth = 240;

const RootLayout = () => {
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  // get the tasks state from the task redux store
  const { tasks } = useSelector((state) => state.tasks);
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

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <>
      <div className="flex">
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="py-4">
            <div>
              <h1 className="flex items-center font-poppins my-8 mx-8 font-bold text-black text-3xl">
                <MdOutlineExplore className="mr-2 text-secondaryBlue" />
                {path ? path : "Explore"}
              </h1>
              <hr />
              <div className="mt-16 px-8 font-right text-md text-gray-800">
                <div className="flex items-center duration-500 hover:text-gray-300">
                  <MdOutlineTaskAlt />{" "}
                  <Link
                    to="/tasks"
                    className="flex items-center justify-between ml-2"
                  >
                    Tasks
                    <p className="ml-2 bg-blue px-2 text-white rounded-lg">
                      {tasks ? tasks.length : 0}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <GoProject />{" "}
                  <Link to="/projects" className="ml-2">
                    Projects
                  </Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <LuMessagesSquare />{" "}
                  <Link to="/chat" className="ml-2">
                    Chat-room
                  </Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <BiTimer />{" "}
                  <Link to="/time-tracker" className="ml-2">
                    Time Tracker
                  </Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <SiGoogleanalytics />{" "}
                  <Link to="/analytics" className="ml-2">
                    Analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
        <div
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "rgba(211, 211, 211, 0.1)",

            ml: `${drawerWidth}px`,
          }}
        >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
