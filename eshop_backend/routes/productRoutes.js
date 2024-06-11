const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const productController = require('../controllers/productController');

// Route cho tất cả products
router.get('/', handleRequest(productController.getAll));
router.get('/:id', handleRequest(productController.getById));
router.post('/', handleRequest(productController.create));
router.put('/:id', handleRequest(productController.update));
router.delete('/:id', handleRequest(productController.delete));

module.exports = router;
