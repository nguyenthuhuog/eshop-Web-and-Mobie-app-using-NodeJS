const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/',adminMiddleware, (req, res) => {
  orderController.getAll((err, orders) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(orders);
    }
  });
});

router.get('/:id',adminMiddleware, (req, res) => {
  const id = req.params.id;
  orderController.getById(id, (err, order) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(order);
    }
  });
});

router.post('/',authMiddleware, (req, res) => {
  const orderData = req.body;
  orderController.create(orderData, (err, newOrder) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newOrder);
    }
  });
});

router.put('/:id',adminMiddleware, (req, res) => {
  const id = req.params.id;
  const orderData = req.body;
  orderController.update(id, orderData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete('/:id',authMiddleware, (req, res) => {
  const id = req.params.id;
  orderController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
