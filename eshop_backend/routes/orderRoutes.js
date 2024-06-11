const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route cho tất cả orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderController.getAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const order = await orderController.getById(id);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const orderData = req.body;
  try {
    const newOrder = await orderController.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const orderData = req.body;
  try {
    const result = await orderController.update(id, orderData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await orderController.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
