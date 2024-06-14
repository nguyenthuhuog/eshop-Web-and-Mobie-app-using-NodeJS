const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Lấy tất cả messages
router.get('/', (req, res) => {
    messageController.getAll((err, results) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        } else {
            res.status(200).json(results);
        }
    });
});

// Lấy message theo ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    messageController.getById(id, (err, result) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        } else {
            res.status(200).json(result);
        }
    });
});

// Tạo mới message
router.post('/', (req, res) => {
    const messageData = req.body;
    messageController.create(messageData, (err, newMessage) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        } else {
            res.status(201).json(newMessage);
        }
    });
});

// Cập nhật message theo ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const messageData = req.body;
    messageController.update(id, messageData, (err, result) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        } else {
            res.status(200).json(result);
        }
    });
});

// Xóa message theo ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    messageController.delete(id, (err, result) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
