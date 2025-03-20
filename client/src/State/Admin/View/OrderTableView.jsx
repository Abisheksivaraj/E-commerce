import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "../../State/Store";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderTableView = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleteOrder,
  ]);
  console.log("admin Orders", adminOrder);

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    console.log("Shipped Order id", orderId);

    handleClose();
  };

  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    console.log("Confirmed Order id", orderId);
    handleClose();
  };

  const handleDeliverOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    console.log("Delivered Order id", orderId);
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };

  return (
    <div className="">
      <Card className="mt-1">
        <CardHeader
          className="bg-[#242b2e] text-white"
          title="Recent Orders"
        ></CardHeader>

        <TableContainer
          sx={{
            bgcolor: "#242b2e",
          }}
        >
          <Table
            sx={{
              color: "white",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Image</TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Title
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  ID
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Price
                </TableCell>

                <TableCell sx={{ color: "white" }} align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.order?.map((item, index) => (
                <TableRow
                  key={item.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">
                    <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar src={orderItem.product.image}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {item.orderItems.map((orderItem) => (
                      <p src={orderItem.product.title}></p>
                    ))}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    {item.totalPrice}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-[#369236]"
                          : item.orderStatus == "SHIPPED"
                          ? "bg-[#4141ff]"
                          : item.orderStatus == "PENDING"
                          ? "bg-[#7b7979]"
                          : item.orderStatus == "PLACED"
                          ? "bg-[#02b290]"
                          : "bg-[#ee4f4f]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTableView;
