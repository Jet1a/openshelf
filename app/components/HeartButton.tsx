"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hook/useFavorite";

interface HeartButtonProps {
  bookId: string;
  currentUser?: SafeUser;
}

const HeartButton = ({ bookId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ bookId, currentUser });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={26}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={22}
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} `}
      />
    </div>
  );
};

export default HeartButton;
