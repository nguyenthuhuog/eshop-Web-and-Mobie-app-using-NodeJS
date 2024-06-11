const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/database');
// Định tuyến cho các bảng
const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const productRoutes = require('./routes/productRoutes');

// Sử dụng bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {console.log(req.path, req.method); next();})
// Sử dụng route cho từng bảng
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderdetails', orderDetailRoutes);
app.use('/api/products', productRoutes);
app.delete('/test/:id', (req,res) => {
  console.log('called delete with id = ', req.params.id);
})
// Khởi động máy chủ
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
