import React from "react";
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
  return (
    <main className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="text-lg sm:text-xl rounded-t-lg bg-gradient-to-r from-[#ffde67] to-[#f3b922] shadow-md text-[#393b3d] p-3 sm:p-4 text-center">
        <span className="font-semibold">
          Bonus virtual item included with a Robux purchase below
        </span>
      </div>

      <div className="flex flex-col sm:flex-row shadow-lg rounded-lg bg-white mt-4 sm:mt-6">
        <div className="flex flex-col items-center py-4 sm:py-6 px-3 sm:px-4 sm:w-1/3 border-b sm:border-b-0 sm:border-r">
          <Image
            width={80}
            height={80}
            src={bonusItem.image}
            alt={bonusItem.name}
            className="mb-3 sm:mb-4"
          />
          {bonusItem.limitedTime && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
              Limited Time Only!
            </span>
          )}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {bonusItem.name}
          </h3>
          <p className="text-gray-600 mt-2 text-xs sm:text-sm text-center">
            {bonusItem.description}
          </p>
        </div>

        <div className="flex flex-col sm:w-2/3 p-3 sm:p-4">
          <div className="border-b flex justify-between items-center py-2">
            <div className="font-bold text-gray-600 text-xs sm:text-sm w-1/3">
              Price
            </div>
            <div className="font-bold text-gray-600 text-xs sm:text-sm w-1/3">
              Robux Packages
            </div>
            <div className="w-1/3"></div>
          </div>
          {robuxPackages.map((pkg, index) => (
            <div
              key={index}
              className="border-b flex justify-between items-center py-2 sm:py-3"
            >
              <div className="text-gray-800 font-medium text-xs sm:text-sm">
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
                <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                  {pkg.robux.toLocaleString()}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleRobuxClick(pkg.robux)}
                  className="bg-blue-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                >
                  Get Robux
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg shadow mt-4 sm:mt-6 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-gray-700">
          Same great value on other Robux packages
        </h2>
        <div className="bg-gray-100 border-b flex justify-between py-2">
          <div className="font-bold text-gray-600 text-xs sm:text-sm w-1/3">
            Price
          </div>
          <div className="font-bold text-gray-600 text-xs sm:text-sm w-1/3">
            Robux Packages
          </div>
        </div>
        {additionalPackages.map((pkg, index) => (
          <div
            key={index}
            className="border-b hover:bg-gray-50 flex justify-between items-center py-2 sm:py-3"
          >
            <div className="text-gray-800 font-medium text-xs sm:text-sm">
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
              <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                {pkg.robux.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleRobuxClick(pkg.robux)}
              className="bg-blue-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded shadow hover:bg-blue-600 transition duration-300"
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
