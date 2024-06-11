const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route cho tất cả images
router.get('/', async (req, res) => {
  try {
    const images = await imageController.getAll();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const image = await imageController.getById(id);
    res.status(200).json(image);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const imageData = req.body;
  try {
    const newImage = await imageController.create(imageData);
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const imageData = req.body;
  try {
    const result = await imageController.update(id, imageData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await imageController.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
