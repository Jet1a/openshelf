"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [searchQuery, setSearhQuery] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearhQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchQuery);
    router.replace(`/discover?${params.toString()}`);
  };

  return (
    <div className="w-[300px] sm:w-[400px] border p-2 rounded-lg ">
      <div className="flex items-center space-x-2 relative">
        <BiSearch size={25} className="text-gray-400 ml-2 justify-self-start" />
        <form
          className="flex items-center flex-1"
          onSubmit={handleSearchSubmit}
        >
          <input
            className="block w-full text-md focus:outline-none"
            type="text"
            placeholder="find the book you like..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
