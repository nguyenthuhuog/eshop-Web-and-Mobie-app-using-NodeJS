const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const categoryController = require('../controllers/categoryController');

// Route cho tất cả categories
router.get('/', handleRequest(categoryController.getAll));
router.get('/:id', handleRequest(categoryController.getById));
router.post('/', handleRequest(categoryController.insert));
router.put('/:id', handleRequest(categoryController.update));
router.delete('/:id', handleRequest(categoryController.delete));

module.exports = router;
