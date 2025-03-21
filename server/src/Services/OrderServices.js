const Address = require("../models/Addressmodals");
const Product = require("../models/ProductModals");
const Order = require("../models/OrderModals");
const OrderItem = require("../models/OrderItemsModals");
const cartService = require("./CartServices");

async function createOrder(user, shippingAddress ) {
  let address;

  // Handle shipping address
  if (shippingAddress._id) {
    const existingAddress = await Address.findById(shippingAddress._id);
    address = existingAddress;
  } else {
    address = new Address(shippingAddress);
    address.user = user;
    address.email = user.email; 

    await address.save();
    user.address.push(address);
    await user.save();
  }

  // Fetch user cart
  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  // Create order items
  for (const item of cart.cartItems) {
    const newOrderItem = new OrderItem({
      price: item.price,
      product: item.product, // Ensure this matches your schema
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await newOrderItem.save();
    orderItems.push(createdOrderItem);
  }

  // Create order
  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    shippingAddress: address,
    discountedPrice: cart.discountedPrice,
    totalItem: cart.totalItem,
  });

  const savedOrder = await createdOrder.save();
  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  return await order.save();
}

async function confirmOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  placeOrder,
  usersOrderHistory,
  findOrderById,
  cancelOrder,
  deliverOrder,
  shipOrder,
  confirmOrder,
};
