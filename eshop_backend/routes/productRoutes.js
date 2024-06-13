const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Checkout route - should be defined before any routes that take an ID parameter
router.post('/checkout', (req, res) => {
  const { userID, products } = req.body; 
  productController.checkout(userID, products, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Get all products
router.get('/', (req, res) => {
  productController.getAll((err, products) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(products);
    }
  });
});

// Get products by category name
router.get('/byCategory/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  productController.getByCategoryName(categoryName, (err, products) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(products);
    }
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  productController.getById(id, (err, product) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(product);
    }
  });
});

// Create a new product
router.post('/', (req, res) => {
  const productData = req.body;
  productController.create(productData, (err, newProduct) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newProduct);
    }
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const productData = req.body;
  productController.update(id, productData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  productController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
