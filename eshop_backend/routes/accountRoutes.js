const express = require('express');
const router = express.Router();
const { handleRequest } = require('../utils/handleRequest');
const accountController = require('../controllers/accountController');

// Route cho tất cả accounts
router.get('/', handleRequest(accountController.getAll));
router.get('/:id', handleRequest(accountController.getById));
router.post('/', handleRequest(accountController.insert));
router.put('/:id', handleRequest(accountController.update));
router.delete('/:id', handleRequest(accountController.delete));

module.exports = router;
