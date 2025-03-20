import React, { useState } from "react";

const SavedAddress = ({ address }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleRadioChange = () => {
    setIsSelected(!isSelected);
  };

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

        {/* Radio Button */}
        <div className="mt-4 flex items-center">
          <input
            type="radio"
            id={`useThisAddress-${address?.id}`}
            name="addressSelection"
            checked={isSelected}
            onChange={handleRadioChange}
            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor={`useThisAddress-${address?.id}`}
            className="ml-2 text-gray-700 text-sm"
          >
            Deliver to this address
          </label>
        </div>

        {/* Deliver Button */}
        {isSelected && (
          <button
            type="button"
            className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            Deliver to this address
          </button>
        )}
      </div>
    </div>
  );
};

export default SavedAddress;
