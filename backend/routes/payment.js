const express = require("express");
const router = express.Router();
const path = require("path");
const { Payment, paymentValidator } = require(path.join(
  __dirname,
  "..",
  "models",
  "payment"
));

// Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new payment
router.post("/", async (req, res) => {
  const { error } = paymentValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    cardNumber,
    expiryDate,
    cvv,
    address,
    phone,
    email,
    products,
    totalAmount,
  } = req.body;
  const payment = new Payment({
    cardNumber,
    expiryDate,
    cvv,
    address,
    phone,
    email,
    products,
    totalAmount,
  });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
