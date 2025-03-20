import { Grid } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Grid container spacing={4}>
        {/* Filter Section */}
        <Grid item xs={12} md={4}>
          <div className="bg-white shadow-lg p-6 rounded-lg sticky top-5">
            <h1 className="font-bold text-xl text-gray-800 mb-6">Filter</h1>

            <div className="space-y-6">
              <h2 className="font-semibold text-lg text-gray-700">
                ORDER STATUS
              </h2>

              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-5 w-5 text-indigo-500 border-gray-300 focus:ring-indigo-500"
                    id={option.value}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={12} md={8}>
          {/* Placeholder for future content */}
          <div className="bg-white shadow-lg flex flex-col gap-4 p-6 rounded-lg">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">My Orders</h2>

            {[1, 1, 1, 1, 1].map((item) => (
              <OrderCard />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
