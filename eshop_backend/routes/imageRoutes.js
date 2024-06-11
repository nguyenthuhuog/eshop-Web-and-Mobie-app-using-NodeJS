const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const imageController = require('../controllers/imageController');

// Route cho tất cả images
router.get('/', handleRequest(imageController.getAll));
router.get('/:id', handleRequest(imageController.getById));
router.post('/', handleRequest(imageController.create));
router.put('/:id', handleRequest(imageController.update));
router.delete('/:id', handleRequest(imageController.delete));

module.exports = router;
