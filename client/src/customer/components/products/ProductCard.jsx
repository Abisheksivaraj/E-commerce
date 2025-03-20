import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="group cursor-pointer w-[15rem] m-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="h-[20rem] overflow-hidden rounded-t-lg">
        <img
          className="h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="bg-white p-3 transition-transform duration-300 group-hover:-translate-y-4">
        <p className="font-bold opacity-60">{product.brand}</p>
        <p className="truncate">{product.title}</p>

        <div className="flex items-center gap-3 mt-1">
          <p className="font-semibold text-lg text-gray-900">
            ₹{product.discountedPrice}
          </p>
          <p className="line-through opacity-50 text-sm">₹{product.price}</p>
          <p className="text-green-600 font-medium text-sm">
            {product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
