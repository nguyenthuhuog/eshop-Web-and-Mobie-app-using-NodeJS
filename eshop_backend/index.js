const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const productController = require('./controllers/productController');
const { authMiddleware, adminMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const visit_count_file = path.join(__dirname, 'visitCount.json');

const readVisitCount = () => {
  try {
    const data = fs.readFileSync(visit_count_file, 'utf8');
    return JSON.parse(data).visitCount;
  } catch (err) {
    return 0;
  }
};

const writeVisitCount = (count) => {
  fs.writeFileSync(visit_count_file, JSON.stringify({ visitCount: count }), 'utf8');
};

let visitCount = readVisitCount();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 900000 } // 15 minutes
}));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());

app.post('/api/visit-count', (req, res) => {
  visitCount++;
  writeVisitCount(visitCount);
  res.json({ visitCount });
});

app.get('/api/visit-count', (req, res) => {
  res.json({ visitCount });
});

// Endpoint to check if user is logged in
app.get('/api/accounts/login-status', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderdetails', orderDetailRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

// Apply the middleware to the checkout route
app.post('/api/products/checkout', authMiddleware, (req, res) => {
  const { userId } = req.session;
  const { products } = req.body; // Assume products is an array of { productID, quantity, price }

  productController.checkout(userId, products, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Checkout failed', error: err });
    }
    res.json(result);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
