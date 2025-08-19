import { Outlet } from "react-router";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <MobileSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className=" bg-white shadow-md flex justify-between px-4 py-2">
          <DesktopSidebar />
      <main className="flex-1 z-0 bg-gradient-to-tl from-[#0e012b] via-[#441cac] to-[#2b40c4] !ml-[270px]">
        <Outlet />
      </main>
      </div>
    </div>
          
          </>
  );
};
