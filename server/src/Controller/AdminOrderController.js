const orderService = require("../Services/OrderServices");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.confirmOrder(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const shipOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.shipOrder(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.deliverOrder(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.cancelOrder(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await orderService.deleteOrder(orderId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
};
