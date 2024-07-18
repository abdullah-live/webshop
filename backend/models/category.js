const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  }
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  subCategories: [subCategorySchema]
});

const categoryValidator = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    subCategories: Joi.array().items(
      Joi.object({
        name: Joi.string().min(2).max(100).required()
      })
    ).optional()
  });
  return schema.validate(category);
};

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = { Category, categoryValidator };
