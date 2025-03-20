import React from "react";
import SavedAddress from "../address/SavedAddress";
import TrackOrder from "./TrackOrder";
import { Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 space-y-10 bg-gray-50 py-10">
      {/* Delivery Address Section */}
      <div className="bg-white shadow-md rounded-md p-5">
        <h1 className="font-semibold text-xl pb-5">Delivery Address</h1>
        <SavedAddress />
      </div>

      {/* Order Tracking Section */}
      <div className="bg-white shadow-md rounded-md p-5">
        <h1 className="font-semibold text-xl pb-5">Order Tracking</h1>
        <TrackOrder activeStep={3} />
      </div>

      {/* Order Items Section */}
      <div className="bg-white shadow-md rounded-md p-5">
        <h1 className="font-semibold text-xl pb-5">Order Items</h1>
        <Grid
          container
          spacing={3} // Add spacing for gaps between items
        >
          {[1, 1, 1, 1, 1, 1].map((item, index) => (
            <Grid
              item
              xs={12} // Full width on extra-small screens
              sm={6} // Two cards per row on small screens
              md={4} // Three cards per row on medium and larger screens
              key={index}
            >
              <div className="shadow-lg rounded-md p-5 border hover:shadow-xl transition-shadow duration-300 bg-white">
                {/* Product Image and Details */}
                <div className="flex">
                  <img
                    className="h-[7rem] w-[7rem] rounded-md object-cover object-center"
                    src="https://i.etsystatic.com/11654563/r/il/f0a012/2284893260/il_570xN.2284893260_e69o.jpg"
                    alt="Product"
                  />
                  <div className="ml-5 space-y-2">
                    <p className="font-medium text-lg text-gray-800">
                      Women's Long Frock
                    </p>
                    <p className="text-sm text-gray-500">
                      <span>Colour: Pink</span> | <span>Size: M</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Seller: Dayalu Designs
                    </p>
                    <p className="text-green-600 font-semibold">₹899</p>
                  </div>
                </div>
                {/* Rating and Review */}
                <div className="mt-5 flex items-center space-x-2">
                  <StarBorderIcon
                    className="text-yellow-500"
                    sx={{ fontSize: "2rem" }}
                  />
                  <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                    Rate & Review the Product
                  </span>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default OrderDetails;
