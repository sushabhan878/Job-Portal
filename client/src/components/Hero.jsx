import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto ">
          <div className="flex items-center">
            <img
              src={assets.search_icon}
              alt="Search icon"
              className="h-4 lg:h-5"
            />
            <input
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <div className="flex items-center">
            <img
              src={assets.location_icon}
              alt="Location icon"
              className="h-4 lg:h-5"
            />
            <input
              type="text"
              placeholder="Search for Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button className="bg-blue-600 px-6 py-2 rounded text-white m-1">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
