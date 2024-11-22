"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../loading";

function Verify() {
  const [adsData, setAdsData] = useState([]);
  const [displayCount, setDisplayCount] = useState(8); // Start with 8 ads
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "https://d3ept9mddcbuhi.cloudfront.net/public/offers/feed.php?user_id=623910&api_key=525aedb31fa76c26997f25d2b15e501f&s1=&s2="
        );

        setAdsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchAds();
  }, []);

  // Handler to load more ads
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 5); // Load 5 more ads
  };

  // Handler to show less ads
  const handleShowLess = () => {
    setDisplayCount(8); // Reset to the initial display count
  };

  return (
    <div className="bg-gray-200 flex flex-col items-center gap-5 px-4 py-[60px]">
      <header className="h-full max-w-6xl w-full verify-header bg-cover bg-center text-center py-8 text-2xl font-bold text-gray-800">
        Complete to get Robux
        <span className="block text-sm font-medium mt-2">
          Complete one of the steps to get Robux!
        </span>
      </header>
      {loading && <Loading />}
      <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
        {adsData.slice(0, displayCount).map((ad) => (
          <div
            key={ad.id}
            className="flex flex-col items-center justify-between border border-gray-300 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              width={80}
              height={80}
              src={ad.network_icon}
              alt={ad.name}
              className="w-20 h-20 object-cover"
              unoptimized
            />
            <div className="flex flex-col items-center gap-2 mt-3">
              <h3 className="text-lg font-semibold text-center">{ad.name}</h3>
              <p className="text-gray-600 text-center">{ad.conversion}</p>
            </div>

            <button
              className="mt-4 w-full py-2 rounded-full border-4 border-white bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              onClick={() => router.push(ad.url)}
            >
              Get Robux
            </button>
          </div>
        ))}
      </div>

      <div className=" mt-8 flex gap-4">
        {displayCount < adsData.length && (
          <button
            className="px-4 py-2 rounded-md border-2 border-black  bg-cyan-400 text-black font-semibold hover:bg-cyan-500 transition-colors"
            onClick={handleLoadMore}
          >
            More offers
          </button>
        )}
        {displayCount > 8 && (
          <button
            className="px-4 py-2 rounded-md border-2 border-black bg-cyan-400 text-black font-semibold hover:bg-cyan-500  transition-colors"
            onClick={handleShowLess}
          >
            Less offers
          </button>
        )}
      </div>
    </div>
  );
}

export default Verify;
