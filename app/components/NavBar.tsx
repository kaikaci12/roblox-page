import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center  bg-gray-400 text-white shadow-md">
      <div className="text-2xl font-semibold p-2">
        <Link href="/">
          <span>☰</span>
        </Link>
      </div>
      <ul className="flex gap-8">
        <li className="hover:bg-gray-600 px-4 py-2 rounded transition-colors">
          <Link href="/discover">Discover</Link>
        </li>
        <li className="hover:bg-gray-600 px-4 py-2 rounded transition-colors">
          <Link href="/marketplace">Marketplace</Link>
        </li>
        <li className="hover:bg-gray-600 px-4 py-2 rounded transition-colors">
          <Link href="/robux">Robux</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
