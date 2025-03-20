import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {

  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`account/order/${5}`)}
      className="p-5 shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 border rounded-lg"
    >
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        {/* Left Section: Product Details */}
        <Grid item xs={12} md={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top rounded-lg"
              src="https://i.etsystatic.com/11654563/r/il/f0a012/2284893260/il_570xN.2284893260_e69o.jpg"
              alt="product"
            />
            <div className="ml-4">
              <p className="text-gray-800 font-semibold">
                Lorem ipsum dolor sit amet
              </p>
              <p className="text-sm text-gray-600 opacity-80">Size: M</p>
              <p className="text-sm text-gray-600 opacity-80">Color: Maroon</p>
            </div>
          </div>
        </Grid>

        {/* Right Section: Price */}
        <Grid item xs={12} md={2}>
          <p className="text-xl font-semibold text-gray-800">₹1000</p>
        </Grid>

        {/* Delivery Status */}
        <Grid item xs={12} md={4}>
          {true ? (
            <div className="flex flex-col space-y-2">
              <p className="flex items-center text-sm text-green-500">
                <AdjustIcon
                  sx={{ width: "16px", height: "16px", marginRight: "8px" }}
                />
                <span>Your item delivered on March 3</span>
              </p>
              <p className="text-sm text-gray-700">
                Your item has been successfully delivered.
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-700">
              Expected delivery on March 3
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
