"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  icon: IconType;
  selected?: boolean;
  label: string;
}

const CategoryInput = ({
  onClick,
  icon: Icon,
  selected,
  label,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 flex flex-col p-4 gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={25} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
