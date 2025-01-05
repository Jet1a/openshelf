import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-[400px] border p-1 rounded-xl hidden md:block">
      <div className="flex items-center justify-center space-x-2 relative">
        <BiSearch size={25} className="text-gray-400 ml-2" />
        <input
          className="block w-full text-md focus:outline-none"
          type="text"
          placeholder="find the book you like..."
        />
        <button
          type="submit"
          className="text-white bg-orange-400 rounded-lg focus:ring-4 focus:outline-none font-medium text-sm py-2 px-6"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
