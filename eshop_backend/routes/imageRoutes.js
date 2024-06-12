const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route cho tất cả images
router.get('/', (req, res) => {
  imageController.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  imageController.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/', (req, res) => {
  const imageData = req.body;
  imageController.create(imageData, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(result);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const imageData = req.body;
  imageController.update(id, imageData, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  imageController.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Thêm route mới cho getByProductID
router.get('/productID/:productID', (req, res) => {
  const productID = req.params.productID;
  imageController.getByProductID(productID, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
