"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box3 from "./Box3";
import robuxPackages from "../../robuxPackages.json";
import additionalPackages from "../../additionalPackages.json";
// import fetchRobloxUser from "../actions/getRobloxUser";
// import Confirmation from "./Confirmation";

import Loading from "./Loader";
const RobuxBox = () => {
  const [username, setUsername] = useState("");
  // const [userNotFound, setUserNotFound] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "input" | "loading" | "box3" | "final" | "confirmation"
  >("input");
  // const [user, setUser] = useState(null);
  const [userOutput, setUserOutput] = useState<string>("");
  const router = useRouter();

  const handleGetRobuxClick = async () => {
    const trimmedUsername = username.trim();

    if (trimmedUsername.length <= 2) {
      alert("Please enter a valid username");
      return;
    }

    setUsername(trimmedUsername);
    setCurrentStep("loading");
    setTimeout(() => {
      setCurrentStep("box3");
    }, 3000);

    setUserOutput(`Searching for ${trimmedUsername}...`);

    // setUserNotFound(false);

    // try {
    //   const fetchedUser = await fetchRobloxUser(trimmedUsername);

    //   if (fetchedUser.error) {
    //     setUser(null);
    //     router.refresh();
    //   }
    //   setUser(fetchedUser);
    //   setCurrentStep("confirmation");
    // } catch (error) {
    //   setUserNotFound(true);
    //   setUserOutput("Something went wrong. Please try again later.");
    //   console.error("Error fetching user:", error);
    // }
  };

  const handleRobuxClick = (robux: number) => {
    setUserOutput(`Sending ${robux} Robux to ${username}`);
    setCurrentStep("loading");
    setTimeout(() => {
      setCurrentStep("final");
    }, 2500);
  };

  // const handleConfirm = () => {
  //   if (user) {
  //     sessionStorage.setItem("robloxUser", JSON.stringify(user));
  //     setCurrentStep("box3");
  //     router.refresh();
  //   }
  // };

  // const handleCancel = () => {
  //   setTimeout(() => {
  //     setUsername("");
  //     setCurrentStep("input");
  //   }, 4000);
  //   setCurrentStep("loading");
  //   setUser(null);
  //   setUserNotFound(false);
  //   setUserOutput("");
  // };

  // useEffect(() => {
  //   const savedUser = sessionStorage.getItem("robloxUser");
  //   if (savedUser && currentStep === "input") {
  //     setUser(JSON.parse(savedUser));
  //     setCurrentStep("box3");
  //   }
  // }, [currentStep]);

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
          </div>
        </div>
      )}

      {currentStep === "loading" && (
        <Loading userOutput={userOutput} verify={false} />
      )}

      {/* {currentStep === "confirmation" && (
        <Confirmation onConfirm={handleConfirm} onCancel={handleCancel} />
      )} */}

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
