import React from "react";
import { User } from "./Confirmation";
import Image from "next/image";
interface LoadingProps {
  user?: User | null;
  userOutput?: string | null;
  verify?: boolean;
}
function Loading({ user, userOutput, verify }: LoadingProps) {
  return (
    <div className="box2">
      <div className="folding">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div
          className={`absolute top-[36%] right-[35%] w-[30px] h-[30px] ${
            verify ? "bg-gray-200" : "bg-white"
          } rotate-[87deg]`}
        ></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <h2 className="useroutput  text-gray-700 text-lg">{userOutput}</h2>
        {user && (
          <div className="flex items-center gap-5">
            <div className="relative flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src={
                  user.profilePictureUrl || user.avatarUrl || "/images/noob.png"
                }
                alt={`${user.displayName}'s Avatar`}
                className="rounded-full w-16 h-16 border-2  object-cover"
                width={100}
                height={100}
              />

              <div className="text-center">
                <span className="block text-sm font-semibold text-gray-600">
                  @{user.username || "roblox-user"}
                </span>
                <span className="block text-sm font-semibold text-gray-900">
                  {user.displayName}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loading;
