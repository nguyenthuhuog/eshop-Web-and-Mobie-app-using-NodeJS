const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

router.get('/', (req, res) => {
  orderDetailController.getAll((err, orderDetails) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(orderDetails);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  orderDetailController.getById(id, (err, orderDetail) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(orderDetail);
    }
  });
});

router.post('/', (req, res) => {
  const orderDetailData = req.body;
  orderDetailController.create(orderDetailData, (err, newOrderDetail) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newOrderDetail);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const orderDetailData = req.body;
  orderDetailController.update(id, orderDetailData, (err, result) => {
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
  orderDetailController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
