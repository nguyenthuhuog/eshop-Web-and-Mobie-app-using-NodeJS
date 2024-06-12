const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', (req, res) => {
  categoryController.getAll((err, categories) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(categories);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  categoryController.getById(id, (err, category) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(category);
    }
  });
});

router.post('/', (req, res) => {
  const categoryData = req.body;
  categoryController.create(categoryData, (err, newCategory) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newCategory);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const categoryData = req.body;
  categoryController.update(id, categoryData, (err, result) => {
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
  categoryController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
