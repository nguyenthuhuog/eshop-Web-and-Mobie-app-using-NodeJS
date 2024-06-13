const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const accountController = require('./controllers/accountController');
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

const visit_count_file = path.join(__dirname, 'visitCount.json');

// Function to read visit count from file
const readVisitCount = () => {
  try {
    const data = fs.readFileSync(visit_count_file, 'utf8');
    return JSON.parse(data).visitCount;
  } catch (err) {
    return 0; // Default visit count if file doesn't exist
  }
};

// Function to write visit count to file
const writeVisitCount = (count) => {
  fs.writeFileSync(visit_count_file, JSON.stringify({ visitCount: count }), 'utf8');
};

// Initialize visit count
let visitCount = readVisitCount();

// Middlewares
app.use(session({
  secret: 'your-secret-key', // Chuỗi bí mật để ký session ID cookie
  resave: false, // Không lưu session nếu không thay đổi
  saveUninitialized: true, // Lưu session mới nhưng không được sửa đổi
  cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(bodyParser.json());

// Middleware to count visits for any page
app.post('/api/visit-count', (req, res) => {
  visitCount++;
  writeVisitCount(visitCount);
  res.json({ visitCount });
});

// Route to get visit count
app.get('/api/visit-count', (req, res) => {
  res.json({ visitCount });
});

app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderdetails', orderDetailRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
