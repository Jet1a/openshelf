import Categories from "@/app/components/Categories";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Categories />
      {children}
    </main>
  );
};

export default layout;
