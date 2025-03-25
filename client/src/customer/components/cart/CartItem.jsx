import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const data = {
      data: {
        id: item._id,
        quantity: item.quantity + num,
      },
      cartItemId: item?._id,
    };

    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex items-center space-x-5">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] overflow-hidden rounded-lg shadow-md">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.image}
            alt="Product"
          />
        </div>

        <div className="ml-5 space-y-2">
          <p className="font-semibold text-lg text-gray-800">
            {item.product.title}
          </p>
          <p className="opacity-70 text-sm">Size:{item.size}, White</p>
          <p className="opacity-70 text-sm">Seller: {item.product.brand}</p>

          <div className="flex items-center flex-col gap-3 pt-4">
            <div className="flex flex-row items-center gap-2">
              {" "}
              <p className="text-xl  font-semibold text-red-400">
                -{item.product.discountPercent}%
              </p>
              <p className=" text-gray-900 font-bold opacity-60">
                ₹{item.discountedPrice}
              </p>
              <p className="text-[green] font-medium">{item.discountPercent}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <p className="text-gray-500 font-bold">M.R.P:</p>
              <p className="text-xl line-through font-medium text-gray-400">
                ₹{item.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-12 pt-6">
        <div className="flex items-center space-x-2">
          {/* Decrement Button */}
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
            className={
              item.quantity <= 1 ? "cursor-not-allowed text-gray-400" : ""
            }
          >
            <RemoveCircleOutline
              className={
                item.quantity <= 1
                  ? "text-gray-400"
                  : "text-blue-400 cursor-pointer"
              }
            />
          </IconButton>

          {/* Quantity Display */}
          <span className="py-1 px-5 bg-gray-100 rounded-full text-gray-800 font-semibold">
            {item.quantity}
          </span>

          {/* Increment Button */}
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            sx={{ color: "rgb(145, 85, 253)" }}
          >
            <AddCircleOutline className="text-blue-400 cursor-pointer" />
          </IconButton>
        </div>

        {/* Remove Button */}
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "rgb(145, 85, 253)" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
