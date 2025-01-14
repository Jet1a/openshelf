import Categories from "@/app/components/Categories";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Categories />
      {children}
    </div>
  );
};

export default layout;
