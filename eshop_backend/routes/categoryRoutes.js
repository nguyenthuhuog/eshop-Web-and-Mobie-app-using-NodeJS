const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route cho tất cả categories
router.get('/', async (req, res) => {
  try {
    const categories = await categoryController.getAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryController.getById(id);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const categoryData = req.body;
  try {
    const newCategory = await categoryController.create(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const categoryData = req.body;
  try {
    const result = await categoryController.update(id, categoryData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await categoryController.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
