const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', (req, res) => {
  accountController.getAll((err, accounts) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(accounts);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  accountController.getById(id, (err, account) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(account);
    }
  });
});

router.post('/', (req, res) => {
  const accountData = req.body;
  accountController.create(accountData, (err, newAccount) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(201).json(newAccount);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const accountData = req.body;
  accountController.update(id, accountData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  accountController.delete(id, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
