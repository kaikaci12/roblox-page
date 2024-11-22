"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box3 from "./Box3";
import robuxPackages from "../../robuxPackages.json";
import additionalPackages from "../../additionalPackages.json";
import fetchRobloxUser from "../actions/getRobloxUser";
import Confirmation from "./Confirmation";

const RobuxBox = () => {
  const [username, setUsername] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "input" | "loading" | "box3" | "final" | "confirmation"
  >("input");
  const [user, setUser] = useState(null);
  const [userOutput, setUserOutput] = useState<string>("");
  const router = useRouter();

  // Retry wrapper for the API call
  const fetchWithRetry = async (username: string, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const fetchedUser = await fetchRobloxUser(username);
        if (fetchedUser) return fetchedUser;
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };

  const handleGetRobuxClick = async () => {
    if (username.trim().length <= 2) {
      alert("Please enter a valid username");
      return;
    }

    setCurrentStep("loading");
    setUserOutput(`Searching for ${username}...`);
    setUserNotFound(false);

    try {
      const fetchedUser = await fetchWithRetry(username, 3);
      if (!fetchedUser) {
        setUserNotFound(true);
        setCurrentStep("input");
        setUserOutput("User not found. Please try again later.");
        return;
      }

      setUser(fetchedUser);
      setCurrentStep("confirmation");
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserNotFound(true);
      setUserOutput("Something went wrong. Please try again later.");
    }
  };

  const handleRobuxClick = (robux: number, username: string) => {
    setUserOutput(`Sending ${robux} Robux to ${username}...`);
    setCurrentStep("loading");
    setTimeout(() => {
      setCurrentStep("final");
    }, 2500);
  };

  const handleConfirm = () => {
    if (user) {
      sessionStorage.setItem("robloxUser", JSON.stringify(user));
      setCurrentStep("box3");
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem("robloxUser");
    setCurrentStep("input");
    setUsername("");
    setUser(null);
    setUserOutput("");
    setUserNotFound(false);
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("robloxUser");
    if (savedUser && currentStep === "input") {
      setUser(JSON.parse(savedUser));
      setCurrentStep("box3");
    }
  }, [currentStep]);

  return (
    <div className="box_con rounded-md">
      {currentStep === "input" && (
        <div className="flex flex-col justify-center">
          <h3>Roblox Username</h3>
          <div className="flex flex-col justify-start sm:flex-row gap-4">
            <input
              type="text"
              className="input-username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleGetRobuxClick} className="self-start">
              Get Robux
            </button>
            {userNotFound && (
              <div className="text-rose-600">
                User not found. Please check the username and try again.
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === "loading" && (
        <div className="box2">
          <div className="folding">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="square"></div>
          </div>
          <p className="useroutput mt-1">{userOutput}</p>
        </div>
      )}

      {currentStep === "confirmation" && (
        <Confirmation
          user={user}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {currentStep === "box3" && (
        <Box3
          additionalPackages={additionalPackages}
          robuxPackages={robuxPackages}
          bonusItem={{
            name: "Clockwork's Golden Shades",
            image:
              "/images/e653327db6d30c02b563cd843ddd18dac0e9a6b80d5baddb392d23c9841f62ff-clockworks_golden_shades.gif",
            description:
              "One bonus item per account. Refunds result in losing the item.",
            limitedTime: true,
          }}
          handleRobuxClick={handleRobuxClick}
        />
      )}

      {currentStep === "final" && (
        <div className="box4">
          <h3>Final Step!</h3>
          <p>
            Please verify that you are not a robot by answering a few questions
            to receive your Robux! Please enter valid information for the Robux
            to go through. Take your time, as completing it will grant you bonus
            Robux as a reward!
          </p>
          <button
            onClick={() => router.push("/verify")}
            style={{ fontSize: "19px" }}
            className="mt-3 w-1/3 hover:bg-green-700 bg-green-500"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default RobuxBox;
