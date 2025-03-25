import React, { useState } from "react";

const SavedAddress = ({ address }) => {
  const [isSelected, setIsSelected] = useState(false);


  return (
    <div className="bg-white p-6 w-[20rem] rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 hover:scale-105">
      <div className="space-y-4">
        {/* User Name */}
        <div className="flex items-center">
          <span className="font-semibold text-gray-900 text-lg">
            {address?.firstName} {address?.lastName}
          </span>
        </div>

        {/* Address Details */}
        <div className="text-gray-700">
          <p>{address?.street}</p>
          <p>
            {address?.city}, {address?.state}, {address?.postalCode}
          </p>
        </div>

        {/* Mobile Number */}
        <div className="text-gray-700">
          <p>Mobile: {address?.MobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default SavedAddress;
