const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/checkout', (req, res) => {
  const { userID, products } = req.body;
  const orderData = {
    userID,
    orderDate: new Date(),
    totalAmount: products.reduce((total, product) => total + product.price * product.quantity, 0)
  };

  const orderDetailsData = products.map(product => ({
    productID: product.productID,
    quantity: product.quantity
  }));

  orderController.createWithDetails(orderData, orderDetailsData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
});

module.exports = router;
