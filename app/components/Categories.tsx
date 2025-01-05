"use client";

import React from "react";
import { TbZoomQuestion } from "react-icons/tb";
import { FaChild } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

import {
  GiSpikedDragonHead,
  GiGreekTemple,
  GiChalkOutlineMurder,
} from "react-icons/gi";
import { LuBookUser, LuGhost } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { LuFeather } from "react-icons/lu";
import { MdSelfImprovement } from "react-icons/md";
import { PiBooks } from "react-icons/pi";

import { RiKnifeBloodLine, RiPlanetLine } from "react-icons/ri";

export const genre = [
  {
    label: "Romance",
    icon: AiOutlineHeart,
    description: "Explore tales of love, passion, and heartfelt connections.",
  },
  {
    label: "Mystery",
    icon: TbZoomQuestion,
    description: "Dive into gripping stories filled with suspense and twists.",
  },
  {
    label: "Fantasy",
    icon: GiSpikedDragonHead,
    description: "Embark on epic adventures in magical and mythical worlds.",
  },
  {
    label: "Thrillers",
    icon: RiKnifeBloodLine,
    description:
      "Experience fast-paced plots that keep you on the edge of your seat.",
  },
  {
    label: "Inspirational",
    icon: HiOutlineLightBulb,
    description: "Discover uplifting stories that ignite hope and motivation.",
  },
  {
    label: "Biography",
    icon: LuBookUser,
    description: "Learn from the lives and journeys of remarkable individuals.",
  },
  {
    label: "History",
    icon: GiGreekTemple,
    description: "Travel back in time with captivating historical narratives.",
  },
  {
    label: "Classics",
    icon: LuFeather,
    description:
      "Revisit timeless literary masterpieces that shaped the world.",
  },
  {
    label: "Literary",
    icon: PiBooks,
    description: "Delve into beautifully written, thought-provoking works.",
  },
  {
    label: "Crime",
    icon: GiChalkOutlineMurder,
    description: "Follow intriguing cases and unravel complex criminal plots.",
  },
  {
    label: "Children",
    icon: FaChild,
    description: "Enjoy delightful tales designed to spark young imaginations.",
  },
  {
    label: "Horror",
    icon: LuGhost,
    description:
      "Feel the chills with spine-tingling tales of fear and suspense.",
  },
  {
    label: "Self-help",
    icon: MdSelfImprovement,
    description:
      "Gain insights and strategies for personal growth and success.",
  },
  {
    label: "Sci-fi",
    icon: RiPlanetLine,
    description:
      "Journey into futuristic worlds and explore the possibilities of science.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isDiscoverPage = pathname === "/discover";

  if (!isDiscoverPage) {
    return null;
  }

  return (
    <div className="sm:px-2 md:px-10 lg:px-14 pt-4 flex flex-row items-center justify-between overflow-x-auto">
      {genre.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          selected={category === item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Categories;
