import React from "react";
import { Link } from "react-router-dom";
import mobile1 from "../assets/images/svg/mobile1.svg";
import { BsGooglePlay, BsApple } from "react-icons/bs";

const Dashboard = () => {
  return (
    <>
      {/* top section */}
      <section>
        <div className="w-10/12 mx-auto mt-8 flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-4xl font-poppins font-bold leading-relaxed">
              Manage your
              <br /> tasks easily with{" "}
              <span className="text-blue uppercase">SIMPLIFY.</span>
            </h1>
          </div>
          <div className="w-1/2 font-poppins">
            <p className="w-10/12 text-md leading-loose">
              As the name said SImplify, We will give you the easiest way to
              manage your day to day activities
            </p>
            <button className="bg-blue px-4 py-2 rounded-full text-white font-semibold mt-4 hover:bg-secondaryBlue">
              Get the App
            </button>
          </div>
        </div>
      </section>
      {/* mobile app */}
      <section className="w-10/12 mx-auto mt-16 rounded-2xl p-8 font-poppins text-black">
        <div className="w-full flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="font-bold mb-4 text-3xl">
              Ready to <span className="text-blue">SIMPLIFY</span> your life
              with us?
            </h1>
            <p>
              Join us and over 300 successful companies and individuals to
              simplify your life by using{" "}
              <span className="text-blue font-bold">Simplify.</span>
            </p>
            <div className="flex items-center justify-between mt-4 font-lato">
              <Link className="flex items-center justify-between bg-black text-white px-4 rounded-lg">
                <BsGooglePlay className="text-2xl mr-2" />{" "}
                <p className="text-md">
                  Get it on <br /> <span className="text-xl">Play Store</span>
                </p>
              </Link>
              <Link className="flex items-center justify-between bg-black text-white px-4 rounded-lg">
                <BsApple className="text-2xl mr-2" />{" "}
                <p className="text-md">
                  Get it on <br /> <span className="text-xl">App Store</span>
                </p>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={mobile1} className="w-72" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
