import { Outlet } from "react-router";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen flex flex-col">
      {/* Mobile sidebar (estado controlado desde aquí). 
          Lo pongo fuera del main y sin wrappers raros */}
      <MobileSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Header fijo en la parte superior (mobile/desktop) */}
      <div className=" bg-white shadow-md flex  justify-between px-4 py-2">
          <DesktopSidebar />
      {/* main: si el header está fixed, damos padding top para que no lo tape */}
      <main className="flex-1 z-0 pt-16"> 
        <Outlet />
      </main>
      </div>
    </div>
          
          </>
  );
};
