const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const orderController = require('../controllers/orderController');

// Route cho tất cả orders
router.get('/', handleRequest(orderController.getAll));
router.get('/:id', handleRequest(orderController.getById));
router.post('/', handleRequest(orderController.create));
router.put('/:id', handleRequest(orderController.update));
router.delete('/:id', handleRequest(orderController.delete));

module.exports = router;
