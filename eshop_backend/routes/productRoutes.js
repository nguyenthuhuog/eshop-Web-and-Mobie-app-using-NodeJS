const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route cho tất cả products
router.get('/', async (req, res) => {
  try {
    const products = await productController.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productController.getById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productController.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const productData = req.body;
  try {
    const result = await productController.update(id, productData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await productController.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
