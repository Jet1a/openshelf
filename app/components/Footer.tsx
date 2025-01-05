import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-4 mt-12 border-t border-neutral-200">
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left px-4 sm:px-6 md:px-12">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-semibold">Openshelf</h2>
          <p className="text-sm">
            Your gateway to the best books, rent free.
          </p>
        </div>
        <div className="text-center text-sm ">
          &copy; {new Date().getFullYear()} Openshelf. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
