// PaymentService.js
const razorpay = require("../config/razorpayClient.js");
const orderService = require("../Services/OrderServices.js");

const createPaymentLink = async (orderId) => {
  try {
    // Validate orderId
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const order = await orderService.findOrderById(orderId);

    // Validate order
    if (!order) {
      throw new Error("Order not found");
    }

    const paymentLinkRequest = {
      amount: Math.round(order.totalPrice * 100), // Ensure integer amount in paise
      currency: "INR",
      customer: {
        name: `${order.user.firstName} ${order.user.lastName}`.trim(),
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true, // Corrected key name
      callback_url: `http://localhost:2288/payment/${orderId}`, // Added a typical port
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    return {
      paymentLinkId: paymentLink.id,
      payment_link_url: paymentLink.short_url,
    };
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw new Error(`Failed to create payment link: ${error.message}`);
  }
};

const updatePaymentInformation = async (reqData) => {
  try {
    const { payment_id: paymentId, order_id: orderId } = reqData;

    // Validate input
    if (!paymentId || !orderId) {
      throw new Error("Payment ID and Order ID are required");
    }

    const order = await orderService.findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails = {
        paymentId,
        status: "COMPLETED",
      };
      order.orderStatus = "PLACED";

      await order.save();

      return {
        message: "Your Order is Placed",
        success: true,
      };
    } else {
      throw new Error("Payment not captured");
    }
  } catch (error) {
    console.error("Error updating payment information:", error);
    throw new Error(`Failed to update payment: ${error.message}`);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
