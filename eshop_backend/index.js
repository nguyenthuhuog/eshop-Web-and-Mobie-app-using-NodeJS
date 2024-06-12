const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const accountController = require('./controllers/accountController');
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderdetails', orderDetailRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

app.post('/login', (req, res) => {
  accountController.login(req.body.username, req.body.password, (err, result) => {
    if (err) {
      console.error("Error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
