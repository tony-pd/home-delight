const razorpay = require("razorpay");
const ShortUniqueId = require("short-unique-id");
const crypto = require("crypto");
const uid = new ShortUniqueId({ length: 10 });

const razorpayInstance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const checkoutHandler = async () => {
  return async (req, res) => {
    try {
      const { amount, currency } = req.body;
      const receipt = `rp_${uid.rnd()}`;
      const paymentCapture = 1;
      const orderConfig = {
        amount: amount,
        currency: currency,
        receipt: receipt,
        paymentCapture: paymentCapture,
      };
      const response = await razorpayInstance.order.create(orderConfig);
      res.status(200).json({
        message: "Payment successful",
        response: response,
      });
    } catch (err) {
      res.status(500).json({
        message: "Payment failed",
        error: err,
      });
    }
  };
};

const verifyHandler = async () => {
  return (req, res) => {
    try {
      const incomingSign = req.headers["x-razorpay-signature"];
      const shasum = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");
      const freshSign = shasum.digest("hex");
      if (incomingSign === freshSign) {
        const orderId = req.body.payload.payment.entity.order_id;
        console.log(orderId);
        res.status(200).json({
          message: "Payment verified",
          response: req.body,
        });
      } else {
        res.status(400).json({
          message: "Payment verification failed",
          response: req.body,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Payment verification failed",
        error: err,
      });
    }
  };
};

module.exports = {
  checkoutHandler,
  verifyHandler,
};
