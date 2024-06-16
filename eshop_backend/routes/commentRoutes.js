const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  commentController.getAll((err, comments) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(comments);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  commentController.getById(id, (err, comment) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(comment);
    }
  });
}); 
router.get('/productID/:id', (req, res) => {
  const id = req.params.id;
  commentController.getByProductId(id, (err, comment) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(comment); 
    }
  });
}); 

router.post('/',authMiddleware, (req, res) => {
  const commentData = req.body;
  commentController.create(commentData, (err, newComment) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newComment);
    }
  });
});

router.put('/:id',authMiddleware, (req, res) => {
  const id = req.params.id;
  const commentData = req.body;
  commentController.update(id, commentData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete('/:id',authMiddleware, (req, res) => {
  const id = req.params.id;
  commentController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
