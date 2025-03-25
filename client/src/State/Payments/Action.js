import { api } from "../../config/apiConfig";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_REQUEST,
} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    const { data } = await api.post(`/payment/${orderId}`, {});

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    } else {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: "Payment link generation failed. Please try again later.",
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    if (errorMessage.includes("Too many requests")) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload:
          "System is currently busy. Please wait a few moments and retry.",
      });
    } else {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: errorMessage || "Payment creation failed",
      });
    }
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.get(
      `/getPayment?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );
    console.log("update Payment:", data);
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
