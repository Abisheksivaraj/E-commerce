import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payments/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import TrackOrder from "../orderPage/TrackOrder";
import SavedAddress from "../address/SavedAddress";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const paymentId = urlParam.get("razorpay_payment_id");
    const paymentStatus = urlParam.get("razorpay_payment_link_status");

    setPaymentId(paymentId);
    setPaymentStatus(paymentStatus);

    if (paymentId && orderId) {
      dispatch(getOrderById(orderId));
      dispatch(updatePayment({ orderId, paymentId })).catch((error) => {
        // Handle payment update error
        console.error("Payment update failed:", error);
      });
    }
  }, [orderId, dispatch]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations! Your Order has been placed.
        </Alert>
      </div>
      <TrackOrder activeStep={1} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order?.order?.orderItems?.map((item) => (
          <Grid
            container
            item
            key={item.product.id}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className=""
                />
                <div className="ml-5 space-y-2">
                  <p className="text-lg font-bold">{item.product.title}</p>
                  <div>Size: {item.size}</div>
                  <p>Seller: {item.product.brand}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <SavedAddress address={order.order?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
