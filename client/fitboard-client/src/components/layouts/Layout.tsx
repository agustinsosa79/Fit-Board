import { Outlet } from "react-router";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="max-h-screen flex flex-col">
      <MobileSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className=" bg-white shadow-md flex justify-between">
          <DesktopSidebar />
      <main className=" text-center dark !z-0 w-full bg-gradient-to-br from-black/90  to-gray-800 md:!ml-[270px] sm:max-h-screen max-w-screen overflow-y-auto overflow-x-hidden ">
        <Outlet />
      </main>
      </div>
    </div>
          
          </>
  );
};
