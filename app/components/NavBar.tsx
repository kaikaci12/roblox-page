"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the close icon from react-icons

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#dee1e3] fixed top-0 left-0 right-0 p-1 sm:p-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Section: Hamburger Menu & Logo */}
        <div className="flex items-center space-x-4">
          <FaBars
            onClick={handleMenuToggle}
            className="text-[#393b3d] text-2xl cursor-pointer sm:hidden"
          />
          <Link href="https://www.roblox.com/home">
            <Image
              width={40}
              height={40}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY3NiAwTDAgNDQuMTY2IDQzLjU3NyA1NmwxMS42NzYtNDQuMTY2TDExLjY3NiAwem0yMC40MDkgMzUuODI3bC0xMi4xNzctMy4zMDggMy4yNjQtMTIuMzQyIDEyLjE4MiAzLjMwOC0zLjI3IDEyLjM0MnoiIGZpbGw9IiMzOTNCM0QiLz48L3N2Zz4="
              alt="Logo"
              className="w-8 h-8 cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links for Large Screens */}
        <div className="hidden sm:flex space-x-6">
          {[
            { href: "https://www.roblox.com/charts", label: "Charts" },
            { href: "https://www.roblox.com/catalog", label: "Marketplace" },
            { href: "https://www.roblox.com/home", label: "Create" },
            {
              href: "https://www.roblox.com/upgrades/robux?ctx=navpopover",
              label: "Robux",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="font-semibold text-[#393b3d] px-4 py-2 border-b-2 border-transparent hover:border-black transition-all">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Icon */}
        <div className="flex justify-end p-4">
          <FaTimes
            onClick={closeMenu}
            className="text-[#393b3d] text-2xl cursor-pointer"
          />
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col mt-4 space-y-4">
          {[
            { href: "https://www.roblox.com/charts", label: "Charts" },
            { href: "https://www.roblox.com/catalog", label: "Marketplace" },
            { href: "https://www.roblox.com/home", label: "Create" },
            {
              href: "https://www.roblox.com/upgrades/robux?ctx=navpopover",
              label: "Robux",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={closeMenu}
                className="font-semibold text-[#393b3d] px-4 py-2 hover:bg-gray-200 transition-all rounded"
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
