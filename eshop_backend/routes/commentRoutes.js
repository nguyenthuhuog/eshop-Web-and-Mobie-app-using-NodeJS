const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const commentController = require('../controllers/commentController');

// Route cho tất cả comments
router.get('/', handleRequest(commentController.getAll));
router.get('/:id', handleRequest(commentController.getById));
router.post('/', handleRequest(commentController.create));
router.put('/:id', handleRequest(commentController.update));
router.delete('/:id', handleRequest(commentController.delete));

module.exports = router;
