"use client";
import React from "react";
import Container from "../Container";
import MenuList from "./MenuList";
import Logo from "./Logo";
import Search from "./Search";
import { SafeUser } from "@/app/types";
import Categories from "../Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
  category?: boolean;
}

const Navbar = ({ currentUser, category }: NavbarProps) => {
  return (
    <nav className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center justify-center gap-4">
              <Logo />
              <Search />
            </div>
            <MenuList currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {category && <Categories />}
    </nav>
  );
};

export default Navbar;
