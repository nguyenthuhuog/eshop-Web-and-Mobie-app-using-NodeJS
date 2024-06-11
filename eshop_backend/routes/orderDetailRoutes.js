const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

// Route cho tất cả order details
router.get('/', async (req, res) => {
  try {
    const orderDetails = await orderDetailController.getAll();
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const orderDetail = await orderDetailController.getById(id);
    res.status(200).json(orderDetail);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const orderDetailData = req.body;
  try {
    const newOrderDetail = await orderDetailController.create(orderDetailData);
    res.status(201).json(newOrderDetail);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const orderDetailData = req.body;
  try {
    const result = await orderDetailController.update(id, orderDetailData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await orderDetailController.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
