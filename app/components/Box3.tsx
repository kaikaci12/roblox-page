import React from "react";
import Image from "next/image";

interface Box3Props {
  userDetails: string[];
  handleRobuxClick: () => void;
}
function Box3({ userDetails, handleRobuxClick }: Box3Props) {
  return (
    <div className="box3">
      <div className="container">
        {userDetails && (
          <div>
            <p>
              User Found: {userDetails.displayName} ({userDetails.name})
            </p>
            {userDetails.avatarUrl && (
              <div>
                <Image
                  src={userDetails.avatarUrl} // Avatar image URL
                  alt={userDetails.displayName}
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
        )}
        <div className="row" onClick={handleRobuxClick}>
          <div className="price">$0.00</div>
          <div className="details">
            <div className="robux_total">
              <div className="pic">
                <Image
                  src="/images/robux-removebg-preview.png"
                  alt="Robux"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Box3;
