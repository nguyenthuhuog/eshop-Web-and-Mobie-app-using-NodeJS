const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/', adminMiddleware, (req, res) => {
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
  accountController.insert(accountData, (err, newAccount) => {
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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  accountController.login(username, password, (err, result) => {
    if (err) {
      return res.status(err).json({ error: err.message || 'Login failed' });
    }
    req.session.userId = result.userID;
    req.session.isAdmin = result.isAdmin;
    res.status(200).json({ message: 'Login successful', result });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
    res.status(200).json({message: 'Logout successful'});
  });
});

// Route to check login status
router.get('/login-status', (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Route to get the current user information
router.get('/current', authMiddleware, (req, res) => {
  res.status(200).json(req.session.user);
});

module.exports = router;
