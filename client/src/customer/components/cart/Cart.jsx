import React from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../State/Cart/Action";
import { store } from "../../../State/Store";

const Cart = () => {
  const { cart } = useSelector((store) => store);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate("/address?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto lg:grid lg:grid-cols-3 lg:px-16 relative">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md grid gap-4">
          {cart.cart?.cartItems?.map((item) => (
            <CartItem item={item} />
          ))}
        </div>

        <div className="px-5 sticky top-0 h-full mt-5 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <p className="uppercase font-bold text-gray-600 pb-4">
              Price Details
            </p>
            <hr className="border-t border-gray-200 mb-4" />

            <div className="space-y-4 font-semibold text-gray-700">
              <div className="flex justify-between items-center">
                <span>Price</span>
                <span className="font-semibold text-lg">
                  ₹{cart.cart?.totalPrice?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Discount</span>
                <span className="font-semibold text-lg text-green-500">
                  -₹{cart.cart?.discountedPrice?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Delivery Charge</span>
                <span className="font-semibold text-lg text-yellow-500">
                  ₹50.00
                </span>
              </div>

              <hr className="border-t border-gray-200 mb-4" />

              {/* Total Amount */}
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold text-2xl text-blue-600">
                  ₹{cart.cart?.totalDiscountedPrice?.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleBuy}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Proceed To Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
