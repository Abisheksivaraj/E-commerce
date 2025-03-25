const payment = require("../Services/PaymentService");

const createPaymentLink = async (req, res) => {
  try {
    const { id: orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
        success: false,
      });
    }

    const paymentLink = await payment.createPaymentLink(orderId);

    return res.status(200).json({
      paymentLink,
      success: true,
    });
  } catch (error) {
    console.error("Payment link creation error:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    await payment.updatePaymentInformation(req.query);

    return res.status(200).json({
      message: "Payment information updated",
      success: true,
    });
  } catch (error) {
    console.error("Payment update error:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
