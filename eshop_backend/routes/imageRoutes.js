const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/', (req, res) => {
  imageController.getAll((err, images) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(images);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  imageController.getById(id, (err, image) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(image);
    }
  });
});

router.post('/', (req, res) => {
  const imageData = req.body;
  imageController.create(imageData, (err, newImage) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newImage);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const imageData = req.body;
  imageController.update(id, imageData, (err, result) => {
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
  imageController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
