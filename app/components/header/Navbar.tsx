"use client";
import React from "react";
import Container from "../Container";
import MenuList from "./MenuList";
import Logo from "./Logo";
import Search from "./Search";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className="w-full bg-white z-10 shadow-sm py-4 border-b">
      <Container>
        <div className="flex items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center justify-center gap-4">
            <Logo />
            <div className="hidden lg:block">
              <Search />
            </div>
          </div>
          <MenuList currentUser={currentUser} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
