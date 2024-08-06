const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardNumber: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 16
  },
  expiryDate: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/,
  },
  cvv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 4
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const paymentValidator = (payment) => {
  const schema = Joi.object({
    cardNumber: Joi.string().length(16).required(),
    expiryDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/).required(),
    cvv: Joi.string().length(3).required(),
    address: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().min(5).max(255).required(),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })).required(),
    totalAmount: Joi.number().min(0).required(),
    createdAt: Joi.date()
  });
  return schema.validate(payment);
}

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment, paymentValidator };
