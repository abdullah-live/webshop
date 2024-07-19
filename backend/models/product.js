const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  subCategory: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  }
});

const productValidator = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(10000).required(),
    price: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string().uri()).required(),
    category: Joi.string().min(2).max(100).required(),
    subCategory: Joi.string().min(2).max(100).required()
  });
  return schema.validate(product);
}

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productValidator };
