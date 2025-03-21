import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Homepage/HomePage";
import Footer from "../components/Footer/Footer";
import Cart from "../components/cart/Cart";
import Product from "../../customer/components/products/Product";
import Navigation from "../components/navigation/Navigation";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Address from "../components/address/Address";
import Order from "../components/orderPage/Order";
import OrderDetails from "../components/orderPage/OrderDetails";
import PaymentSuccess from "../components/payments/PaymentSuccess";
import ProfilePage from "../components/navigation/ProfilePage";
const CustomerRouter = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/register" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/address" element={<Address />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouter;
