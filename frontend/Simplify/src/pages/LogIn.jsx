import React from "react";
import { GiBookPile } from "react-icons/gi";
import taskImage from "../assets/images/taskImage.jpg";

const LogIn = () => {
  return (
    <>
      <div className="w-full h-screen mx-auto flex items-center justify-center">
        <div className="w-full h-full mx-auto flex items-center justify-center">
          <div className="w-1/3 h-5/6 p-8 bg-white shadow-lg">
            <form>
              <div className="flex items-center text-navyBlue text-3xl mb-8">
                <GiBookPile className="" />
                <h2 className="font-poppins font-bold ml-2 uppercase">
                  Simplify
                </h2>
              </div>
              <div className="mt-16">
                <h3 className="font-poopins font-bold text-2xl text-navyBlue mb-8">
                  Sign In to your Account
                </h3>
                <div className="flex flex-col">
                  <input
                    type="Your email"
                    value=""
                    placeholder="Your email"
                    id="email"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value=""
                    placeholder="Your password"
                    id="password"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <button className="w-full bg-navyBlue h-10 mt-4 text-lg text-white font-poppins hover:rounded-lg">
                    Log In
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Don't have an Account?</p>
                  <p className="text-navyBlue font-poppins font-bold text-lg cursor-pointer border-b-2 border-b-navyBlue">
                    Register Here
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
