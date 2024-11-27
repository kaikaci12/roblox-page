"use client";

import { useState, useEffect } from "react";
import Offer from "./Offer";

const ClickTracker = ({ children }: { children: React.ReactNode }) => {
  const [showOffer, setShowOffer] = useState(false);
  const [clicks, setClicks] = useState(0); // Track number of clicks

  useEffect(() => {
    const handleClick = () => {
      setClicks((prevClicks) => {
        const newClickCount = prevClicks + 1;
        console.log(clicks);

        if (newClickCount % 3 === 0 && !showOffer) {
          setShowOffer(true);
        }

        return newClickCount;
      });
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showOffer]); // Only update if showOffer changes

  const removeOffer = () => {
    setShowOffer(false);
    setClicks(0); // Reset click count when the offer is removed
  };

  return (
    <div>
      {children}

      {showOffer && (
        <div>
          <Offer removeOffer={removeOffer} />

          <button
            onClick={removeOffer}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Close Offer
          </button>
        </div>
      )}
    </div>
  );
};

export default ClickTracker;
