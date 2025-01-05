"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="text-2xl font-extrabold text-orange-400">
      <h1 onClick={() => router.push("/")} className=" cursor-pointer">
        OPENSHELF
      </h1>
    </div>
  );
};

export default Logo;
