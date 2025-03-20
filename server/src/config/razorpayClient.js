const Razorpay = require("razorpay");

apiKey = "rzp_test_zcFOVHeDThnXPx";
apiSecret = "kUQwocCwskbYelcag0f11Cq4";

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
