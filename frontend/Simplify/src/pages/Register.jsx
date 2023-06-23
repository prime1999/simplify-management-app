import React from "react";
import { GiBookPile } from "react-icons/gi";
import taskImage from "../assets/images/taskImage.jpg";

const Register = () => {
  return (
    <>
      <div className="w-full h-screen mx-auto flex items-center justify-center">
        <div className="w-full h-full mx-auto flex items-center justify-center">
          <div className="w-1/3 h-5/6 p-8 bg-white shadow-lg">
            <form>
              <div className="flex items-center text-navyBlue text-3xl">
                <GiBookPile className="" />
                <h2 className="font-poppins font-bold ml-2 uppercase">
                  Simplify
                </h2>
              </div>
              <div className="mt-16">
                <h3 className="font-poopins font-bold text-3xl text-navyBlue">
                  Create An Account
                </h3>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value=""
                    placeholder="Your name"
                    id="name"
                    className="h-12 p-2 bg-gray-100 border-b-2 my-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="email"
                    value=""
                    placeholder="Your email"
                    id="email"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value=""
                    placeholder="Create password"
                    id="password"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value=""
                    placeholder="Confirm password"
                    id="password2"
                    className="h-12 p-2 bg-gray-100 border-b-2 focus:outline-none focus:border-navyBlue"
                  />
                  <button className="w-full bg-navyBlue h-10 mt-4 text-lg text-white font-poppins hover:rounded-lg">
                    Sign Up
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Already have an Account?</p>
                  <p className="text-navyBlue font-poppins font-bold text-lg cursor-pointer border-b-2 border-b-navyBlue">
                    LOG-IN
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

export default Register;
