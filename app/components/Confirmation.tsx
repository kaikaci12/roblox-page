import React from "react";
import Image from "next/image";

export type User = {
  displayName: string;
  avatarUrl: string | null;
  username: string;
};

interface ConfirmationProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirmation = ({ user, onConfirm, onCancel }: ConfirmationProps) => {
  return (
    <div className="confirmation-step flex flex-col items-center space-y-6 text-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Confrim account</h3>

      <div className="profile-info flex flex-col items-center space-y-4 p-4 rounded-lg bg-gray-100 shadow-2xl border-[3px] border-green-600">
        {user.avatarUrl ? (
          <div className="relative w-36 h-36">
            <Image
              src={user.avatarUrl}
              alt={`${user.displayName}'s Avatar`}
              className="rounded-full border-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
              width={144}
              height={144}
              priority
            />
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full border-[2px] border-white shadow-md flex items-center justify-center">
              <span className="text-xs font-bold text-white">PRO</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Avatar not available</p>
        )}
        <div className="user-details text-center">
          <h4 className="text-2xl font-bold text-gray-900 tracking-wider">
            {user.displayName || "Display name not available"}
          </h4>
        </div>
      </div>

      <div className="confirmation-buttons flex gap-4">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={onConfirm}
        >
          Yes, this is me!
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={onCancel}
        >
          No, change username
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
