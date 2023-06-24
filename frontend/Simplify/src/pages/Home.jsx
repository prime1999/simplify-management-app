import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { GiBookPile } from "react-icons/gi";
import taskImage from "../assets/images/taskImage.jpg";

const Home = () => {
  return (
    <div className="container flex justify-center items-center h-screen w-10/12 mx-auto">
      <div className="flex justify-center items-center h-[600px] w-full rounded-xl p-4 bg-white shadow-xl">
        <Grid container spacing={2}>
          <Grid item xs={0} md={4}>
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex justify-center items-center bg-blue text-white h-[580px] rounded-xl w-full">
                <GiBookPile className="text-white text-3xl" />
                <h3 className="font-poppins font-bold text-3xl ml-2 uppercase">
                  Simplify{" "}
                </h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="flex justify-center items-center h-full w-full p-4">
              <div className="w-full">
                <div className="flex items-center justify-center">
                  <GiBookPile className="text-blue text-3xl" />
                  <h2 className="font-poppins font-bold text-lg text-blue ml-2">
                    Simplify Task App
                  </h2>
                </div>
                <div className="flex flex-col items-center mt-4 h-[500px] w-full">
                  <img className="w-[500px]" src={taskImage} alt="" />
                  <div className="flex flex-col justify-center items-center w-full">
                    <button className="w-1/2 border-2 border-blue py-2 rounded-full font-lato text-blue font-md font-semibold hover:bg-blue hover:text-white">
                      Get Started
                    </button>
                    <button className="w-1/2 mt-4 bg-blue py-2 rounded-full font-lato border-2 border-white text-white font-md font-semibold hover:border-2 hover:border-blue hover:bg-white hover:text-blue">
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
