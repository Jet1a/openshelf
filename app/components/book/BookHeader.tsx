"use client";
import { SafeUser } from "@/app/types";
import React from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface BookHeaderProps {
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const BookHeader = ({ imageSrc, id, currentUser }: BookHeaderProps) => {
  return (
    <div className="relative w-full max-w-[400px] h-[60vh] overflow-hidden drop-shadow-book">
      <Image
        src={imageSrc}
        alt="book"
        fill
        className="object-contain w-full h-auto"
      />
      <div className="absolute bottom-3 right-[70px] rounded-full p-2 bg-neutral-200/70">
        <HeartButton bookId={id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default BookHeader;
