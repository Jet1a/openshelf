"use client";

import AddModal from "./AddModal";
import { usePathname } from "next/navigation";

const ConditionalAddModal = () => {
  const pathname = usePathname();

  if (pathname === "/catalog") {
    return null;
  }

  return <AddModal />;
};

export default ConditionalAddModal;
