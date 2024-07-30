const express = require('express');
const router = express.Router();
const path = require('path');  // Include path module

// Adjust the path to the Product model to be relative to the current directory
const { Product } = require(path.join(__dirname, '..', 'models', 'product'));

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('subCategory');
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('subCategory');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, images, category, subCategory } = req.body;
  const product = new Product({ name, description, price, images, category, subCategory });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, description, price, images, category, subCategory } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, images, category, subCategory },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category').populate('subCategory');
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
