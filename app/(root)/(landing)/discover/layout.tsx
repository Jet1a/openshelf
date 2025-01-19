import Categories from "@/app/components/Categories";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <Categories />
      {children}
    </section>
  );
};

export default layout;
