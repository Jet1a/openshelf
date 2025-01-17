"use client";

import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hook/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import useRegisterModal from "@/app/hook/useRegisterModal";
import useAddModal from "@/app/hook/useAddModal";

interface MenuListProps {
  currentUser?: SafeUser | null;
}

const MenuList = ({ currentUser }: MenuListProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const addModal = useAddModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onAddBook = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    addModal.onOpen();
  }, [currentUser, loginModal, addModal]);

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerMenu = () => setIsHamburgerOpen(!isHamburgerOpen);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Hamburger Button for Small Screens */}
        <div className="sm:hidden">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            onClick={toggleHamburgerMenu}
          >
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex cursor-pointer gap-3">
          <MenuItem onClick={() => router.push(`/discover`)} label="Discover" />
          <MenuItem onClick={() => router.push(`/mybooks`)} label="My Books" />
          <MenuItem
            onClick={() => router.push(`/favorites`)}
            label="Favorites"
          />
          <div
            onClick={toggleOpen}
            className="p-2 flex items-center gap-3 rounded-full cursor-pointer transition md:py-1 md:px-2 hover:shadow-md"
          >
            <div className="hidden sm:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Content */}
      {isHamburgerOpen && (
        <div className="absolute z-10 top-14 right-0 w-[30vw] overflow-hidden bg-white shadow-md rounded-lg border border-neutral-300 text-sm">
          <div className="flex flex-col">
            <MenuItem
              onClick={() => router.push(`/discover`)}
              label="Discover"
            />
            <MenuItem
              onClick={() => router.push(`/mybooks`)}
              label="My Books"
            />
            <MenuItem
              onClick={() => router.push(`/favorites`)}
              label="Favorites"
            />
            {currentUser ? (
              <>
                <span className="px-4 py-3 transition font-semibold">
                  Welcome {currentUser?.name}
                </span>
                <hr />
                {currentUser?.isAdmin && (
                  <div className="cursor-pointer">
                    <MenuItem onClick={onAddBook} label="Add Books" />
                    <MenuItem
                      onClick={() => router.push("/rented")}
                      label="Rental History"
                    />
                    <MenuItem
                      onClick={() => router.push("/catalog")}
                      label="Catalog"
                    />
                  </div>
                )}
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <div className="cursor-pointer">
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </div>
            )}
          </div>
        </div>
      )}
      {isOpen && (
        <div className="hidden sm:block absolute z-10 rounded-lg shadow-lg w-[20vw] md:w-2/4 border border-neutral-300 bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <span className="px-4 py-3 transition font-semibold">
                  Welcome {currentUser?.name}
                </span>
                <hr />
                {currentUser?.isAdmin && (
                  <div className="cursor-pointer">
                    <MenuItem onClick={onAddBook} label="Add Books" />
                    <MenuItem
                      onClick={() => router.push("/rented")}
                      label="Rental History"
                    />
                    <MenuItem
                      onClick={() => router.push("/catalog")}
                      label="Catalog"
                    />
                  </div>
                )}
                <div className="cursor-pointer">
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </div>
              </>
            ) : (
              <div className="cursor-pointer">
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
