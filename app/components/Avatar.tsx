import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || "/images/avatar.png"}
      alt="avatar"
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};

export default Avatar;
