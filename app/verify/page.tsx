"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Verify() {
  const [adsData, setAdsData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "https://d3ept9mddcbuhi.cloudfront.net/public/offers/feed.php?user_id=623910&api_key=525aedb31fa76c26997f25d2b15e501f&s1=&s2="
        );
        setAdsData(response.data);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="mt-20 flex flex-wrap justify-center gap-6 p-6">
      {adsData.map((ad) => (
        <div
          key={ad.id}
          className="max-w-xs w-full border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
        >
          <Image
            width={20}
            height={20}
            src={ad.network_icon}
            alt={ad.name}
            className="w-20 h-20 mx-auto object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-center mb-2">{ad.name}</h3>
          <p className="text-gray-600 text-center mb-4">{ad.anchor}</p>
          <p className="text-gray-800 mb-2">{ad.conversion}</p>

          <button
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => router.push(ad.url)}
          >
            Go to Offer
          </button>
        </div>
      ))}
    </div>
  );
}

export default Verify;
