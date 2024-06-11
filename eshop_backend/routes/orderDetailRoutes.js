const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const orderDetailController = require('../controllers/orderDetailController');

// Route cho tất cả orderDetails
router.get('/', handleRequest(orderDetailController.getAll));
router.get('/:id', handleRequest(orderDetailController.getById));
router.post('/', handleRequest(orderDetailController.create));
router.put('/:id', handleRequest(orderDetailController.update));
router.delete('/:id', handleRequest(orderDetailController.delete));

module.exports = router;
