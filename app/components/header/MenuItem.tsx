import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string | undefined;
}

const MenuItem = ({ onClick, label = "User" }: MenuItemProps) => {
  return (
    <div onClick={onClick} className="px-4 py-3 transition font-semibold">
      <div className="group relative">
        <span>{label}</span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-[2px] bg-orange-400 group-hover:w-full"></span>
      </div>
    </div>
  );
};

export default MenuItem;
