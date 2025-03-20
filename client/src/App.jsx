import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./customer/Router/CustomerRouter";
import AdminRouter from "../src/customer/Router/AdminRouter";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouter/>} />
      </Routes>
    </div>
  );
};

export default App;
