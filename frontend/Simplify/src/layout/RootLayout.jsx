import React from "react";
import { Link, Outlet } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Navbar from "../components/Navbar";
import { MdOutlineTaskAlt, MdOutlineExplore } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { BiTimer } from "react-icons/bi";
import Footer from "../components/Footer";

const drawerWidth = 240;

const RootLayout = () => {
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
                Explore
              </h1>
              <hr />
              <div className="mt-16 px-8 font-right text-md text-gray-800">
                <div className="flex items-center duration-500 hover:text-gray-300">
                  <MdOutlineTaskAlt /> <Link className="ml-2">Tasks</Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <GoProject /> <Link className="ml-2">Projects</Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <BiTimer /> <Link className="ml-2">Time Tracker</Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <SiGoogleanalytics /> <Link className="ml-2">Analytics</Link>
                </div>
                <div className="flex items-center mt-8 duration-500 hover:text-gray-300">
                  <FiSettings /> <Link className="ml-2">Settings</Link>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
        <div
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "rgba(135,206,235, 0.05)",

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
