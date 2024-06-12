const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

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
