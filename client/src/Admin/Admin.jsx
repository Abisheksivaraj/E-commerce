import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateProducts from "./Components/CreateProducts";
import OrdersTable from "./Components/OrdersTable";
import ProductsTable from "./Components/ProductsTable";
import Dashboard from "./Components/Dashboard";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
import People from "@mui/icons-material/People";
import Receipt from "@mui/icons-material/Receipt";
import AddBox from "@mui/icons-material/AddBox";
import Logout from "@mui/icons-material/Logout";
import AdminRegister from "./Components/AdminRegister";
const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon style={{ color: "white" }} />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <ProductionQuantityLimits style={{ color: "white" }} />,
  },

  {
    name: "Orders",
    path: "/admin/orders",
    icon: <Receipt style={{ color: "white" }} />,
  },
  {
    name: "AddProducts",
    path: "/admin/product/create",
    icon: <AddBox style={{ color: "white" }} />,
  },
];

const Admin = () => {
  const handleLogout = () => {
    navigate("/");
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        color: "white",
        bgcolor: "#242b2e",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        height: "100%",
      }}
    >
      <>
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText className="text-white">Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="">
      <div className="relative flex h-[100vh]  ">
        <CssBaseline>
          <div className="w-[15%]  border-2 border-r-gray-500 h-full fixed top-0">
            {drawer}
          </div>

          <div className="w-[85%] ml-[16%]">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/product/create" element={<CreateProducts />} />

              <Route path="/orders" element={<OrdersTable />} />
          
              <Route path="/products" element={<ProductsTable />} />
              <Route path="/adminRegister" element={<AdminRegister />} />
            </Routes>
          </div>
        </CssBaseline>
      </div>
    </div>
  );
};

export default Admin;
