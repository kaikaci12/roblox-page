"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa"; // Import the hamburger menu icon from react-icons

import { useRouter } from "next/navigation";
const NavBar = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between bg-[#dee1e3] ">
      <div className="flex items-center space-x-8  justify-start">
        <FaBars
          onClick={() => router.refresh()}
          className="text-[#393b3d] text-lg cursor-pointer"
        />
        <div className="flex gap-5  justify-between items-center">
          <Link href="https://www.roblox.com/home">
            <Image
              width={30}
              height={30}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY3NiAwTDAgNDQuMTY2IDQzLjU3NyA1NmwxMS42NzYtNDQuMTY2TDExLjY3NiAwem0yMC40MDkgMzUuODI3bC0xMi4xNzctMy4zMDggMy4yNjQtMTIuMzQyIDEyLjE4MiAzLjMwOC0zLjI3IDEyLjM0MnoiIGZpbGw9IiMzOTNCM0QiLz48L3N2Zz4="
              alt="Logo"
              className="h-8 w-8 cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
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
                className="flex items-cente font-semibold text-[#393b3d] px-4 py-2 
                border-b-2 border-transparent hover:border-black transition-all"
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
