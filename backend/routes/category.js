const express = require('express');
const router = express.Router();
const path = require('path');  // Include path module

// Adjust the path to the Category model to be relative to the current directory
const { Category, categoryValidator } = require(path.join(__dirname, '..', 'models', 'category'));

// Get all categories with subcategories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get category names by IDs
router.post('/names', async (req, res) => {
  const { categoryIds } = req.body;

  try {
    const categories = await Category.find({ _id: { $in: categoryIds } }).select('name');
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  const { error } = categoryValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, subCategories } = req.body;
  const category = new Category({ name, subCategories });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  const { error } = categoryValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, subCategories } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, subCategories },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.remove();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
