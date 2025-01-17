"use client";
import React from "react";
import Image from "next/image";

interface BookHeaderProps {
  imageSrc: string;
}

const BookHeader = ({ imageSrc }: BookHeaderProps) => {
  return (
    <div className="relative w-full max-w-[400px] h-[45vh] sm:h-[60vh] overflow-hidden drop-shadow-book">
      <Image
        src={imageSrc}
        alt="book"
        fill
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export default BookHeader;
