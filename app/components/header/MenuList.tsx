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

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="flex cursor-pointer">
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
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
            {isOpen && (
              <div className="absolute z-10 rounded-lg shadow-lg w-[20vw] md:w-2/4 border border-neutral-300 bg-white overflow-hidden right-0 top-14 text-sm">
                <div className="flex flex-col">
                  {currentUser ? (
                    <>
                      <span className="px-4 py-3 transition font-semibold">
                        Welcome {currentUser?.name}
                      </span>
                      <hr />
                      {currentUser?.isAdmin && (
                        <>
                          <MenuItem onClick={onAddBook} label="Add Books" />
                          <MenuItem
                            onClick={() => router.push('/rented')}
                            label="Rental History"
                          />
                          <MenuItem onClick={() => router.push('/catalog')} label="Catalog" />
                        </>
                      )}
                      <MenuItem onClick={() => signOut()} label="Logout" />
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={loginModal.onOpen} label="Login" />
                      <MenuItem
                        onClick={registerModal.onOpen}
                        label="Sign up"
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
