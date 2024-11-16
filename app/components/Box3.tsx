import React, { useState, useEffect } from "react";
import Image from "next/image";

interface RobuxPackage {
  price: string;
  robux: number;
}

interface Box3Props {
  handleRobuxClick: (robuxAmount: number) => void;
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
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Section with Bonus Info */}
      <div className="relative text-lg sm:text-xl rounded-t-lg bg-gradient-to-r from-[#ffde67] to-[#f3b922] shadow-lg text-[#2e2e2e] p-6 text-center">
        <h2 className="font-semibold text-xl text-gray-800">
          Bonus virtual item included with a Robux purchase below
        </h2>
        <div className=" top-4 right-4 w-36 h-36 flex items-center justify-center mx-auto">
          {user ? (
            <div className="relative flex gap-2 items-center w-24 h-24">
              <Image
                src={user.profilePictureUrl}
                alt={`${user.displayName}'s Avatar`}
                className="rounded-full border-4 border-white shadow-lg"
                width={96}
                height={96}
              />
              <div className="absolute bottom-1 right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-[2px] border-white shadow-md">
                <span className="text-xs font-bold text-white">PRO</span>
              </div>
              <div className="text-center mt-3">
                <span className="block text-md font-semibold text-gray-900">
                  {user.displayName || "Display name not available"}
                </span>
                <span className="text-sm text-gray-600">@{user.username}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Avatar not available</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className=" bg-red-600 text-white font-semibold text-sm px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-200 shadow-md"
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row shadow-lg rounded-lg bg-white">
        {/* Bonus Item Info */}
        <div className="flex flex-col items-center py-6 sm:w-1/4 border-b sm:border-b-0 sm:border-r">
          <Image
            width={70}
            height={70}
            src={bonusItem.image}
            alt={bonusItem.name}
            className="mb-4"
          />
          {bonusItem.limitedTime && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full mb-4">
              Limited Time Only!
            </span>
          )}
          <div className="flex flex-col items-start justify-center w-full">
            <h3 className="text-xl text-center font-semibold text-gray-800">
              {bonusItem.name}
            </h3>
            <p className="text-gray-600 text-sm mt-2 text-center">
              {bonusItem.description}
            </p>
          </div>
        </div>

        {/* Robux Package Options */}
        <div className="flex flex-col sm:w-2/3 py-4 px-6">
          <div className="border-b flex justify-between items-center py-3">
            <div className="font-bold text-gray-600 text-sm w-1/3">Price</div>
            <div className="font-bold text-gray-600 text-sm w-1/3">
              Robux Packages
            </div>
            <div className="w-1/3"></div>
          </div>
          {robuxPackages.map((pkg, index) => (
            <div
              key={index}
              className="border-b flex justify-between items-center py-4"
            >
              <div className="text-gray-800 font-medium text-sm">
                {pkg.price}
              </div>
              <div className="flex items-center">
                <Image
                  alt="Robux icon"
                  width={24}
                  height={24}
                  src="/images/robux.png"
                  className="mr-2"
                />
                <span className="text-gray-900 font-semibold text-sm">
                  {pkg.robux.toLocaleString()}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleRobuxClick(pkg.robux)}
                  className="bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
                >
                  Get Robux
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Packages */}
      <div className="bg-gray-50 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
          Same great value on other Robux packages
        </h2>
        <div className="bg-gray-100 border-b flex justify-between py-2">
          <div className="font-bold text-gray-600 text-sm w-1/3">Price</div>
          <div className="font-bold text-gray-600 text-sm w-1/3">
            Robux Packages
          </div>
        </div>
        {additionalPackages.map((pkg, index) => (
          <div
            key={index}
            className="border-b hover:bg-gray-50 flex justify-between items-center py-4"
          >
            <div className="text-gray-800 font-medium text-sm">{pkg.price}</div>
            <div className="flex items-center">
              <Image
                alt="Robux icon"
                width={24}
                height={24}
                src="/images/robux.png"
                className="mr-2"
              />
              <span className="text-gray-900 font-semibold text-sm">
                {pkg.robux.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleRobuxClick(pkg.robux)}
              className="bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
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
