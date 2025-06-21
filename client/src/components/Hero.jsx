import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

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
              ref={titleRef}
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
              ref={locationRef}
              type="text"
              placeholder="Search for Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex flex-center justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium ">Trusted By</p>
          <img
            src={assets.microsoft_logo}
            alt="Compani Logo"
            className="h-6 "
          />
          <img src={assets.walmart_logo} alt="Compani Logo" className="h-6 " />
          <img
            src={assets.accenture_logo}
            alt="Compani Logo"
            className="h-6 "
          />
          <img src={assets.samsung_logo} alt="Compani Logo" className="h-6 " />
          <img src={assets.amazon_logo} alt="Compani Logo" className="h-6 " />
          <img src={assets.adobe_logo} alt="Compani Logo" className="h-6 " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
