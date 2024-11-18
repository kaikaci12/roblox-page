import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

interface RobuxPackage {
  price: string;
  robux: number;
}

interface Box3Props {
  handleRobuxClick: (robuxAmount: number, username: string) => void;
  bonusItem: {
    name: string;
    image: string;
    description: string;
    limitedTime: boolean;
  };
  robuxPackages: RobuxPackage[];
  additionalPackages: RobuxPackage[];
}

const Box3: React.FC<Box3Props> = ({
  handleRobuxClick,
  bonusItem,
  robuxPackages,
  additionalPackages,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("robloxUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("robloxUser");
    window.location.reload();
  };

  return (
    <main className=" space-y-10">
      <div className="rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-md p-5 text-gray-800 text-center ">
        <h2 className="font-semibold text-xl sm:text-2xl  flex items-center justify-center gap-3">
          Bonus Virtual Item Included with a Robux Purchase
          <FiChevronDown
            width={25}
            height={25}
            className="text-gray-700 w-5 h-5 sm:w-10 sm:h-8 cursor-pointer"
          />
        </h2>

        {user && (
          <div className="flex flex-col mt-2 items-center space-y-3">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src={user.profilePictureUrl}
                alt={`${user.displayName}'s Avatar`}
                className="object-cover w-full h-full"
                width={112}
                height={112}
                priority
              />
            </div>

            {/* User Info */}
            <div>
              <span className="block text-lg sm:text-xl font-medium text-gray-900">
                {user.displayName || "No Display Name"}
              </span>
              <span className="text-sm text-gray-600">@{user.username}</span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white font-medium text-sm sm:text-base px-5 py-2 rounded-lg hover:bg-red-600 transition shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Log Out
        </button>
      </div>

      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center py-8 px-6 sm:w-1/3 border-b sm:border-b-0 sm:border-r bg-gray-50">
          <Image
            width={100}
            height={100}
            src={bonusItem.image}
            alt={bonusItem.name}
            className="mb-4"
          />
          {bonusItem.limitedTime && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
              Limited Time Only!
            </span>
          )}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {bonusItem.name}
          </h3>
          <p className="text-gray-600 text-sm mt-2 text-center">
            {bonusItem.description}
          </p>
        </div>

        <div className="flex flex-col sm:w-2/3 py-6 px-8">
          <div className="border-b flex justify-between items-center py-3 text-base font-semibold text-gray-700">
            <div className="w-1/3">Price</div>
            <div className="w-1/3">Robux Packages</div>
            <div className="w-1/3"></div>
          </div>
          {robuxPackages.map((pkg, index) => (
            <div
              key={index}
              className="border-b flex justify-between items-center py-4 hover:bg-gray-50 transition"
            >
              <div className="text-gray-900 font-medium">{pkg.price}</div>
              <div className="flex items-center p-2 justify-center w-[180px] bg-[#393b3d] rounded-md">
                <div className="flex gap-1.5 items-center">
                  <Image
                    alt="Robux icon"
                    width={100}
                    height={100}
                    src="/images/robux-white.png"
                    className="w-6"
                  />
                  <span className="font-bold text-white sm:text-lg">
                    {pkg.robux.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRobuxClick(pkg.robux, user.username)}
                className="bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Robux
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
          Same Great Value on Other Robux Packages
        </h2>
        <div className="border-b flex justify-between items-center py-2 text-base font-bold text-gray-700 bg-gray-100">
          <div className="w-1/3">Price</div>
          <div className="w-1/3">Robux Packages</div>
          <div className="w-1/3"></div>
        </div>
        {additionalPackages.map((pkg, index) => (
          <div
            key={index}
            className="border-b flex justify-between items-center py-4 hover:bg-gray-50 transition"
          >
            <div className="text-gray-900 font-medium">{pkg.price}</div>
            <div className="flex items-center p-2 justify-center w-[180px] border border-gray-400 bg-transparent rounded-md">
              <div className="flex gap-1.5 items-center">
                <Image
                  alt="Robux icon"
                  width={100}
                  height={100}
                  src="/images/robux-gray.png"
                  className="w-6"
                />
                <span className="font-bold text-gray-700 sm:text-lg">
                  {pkg.robux.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleRobuxClick(pkg.robux, user.username)}
              className="bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Get Robux
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Box3;
