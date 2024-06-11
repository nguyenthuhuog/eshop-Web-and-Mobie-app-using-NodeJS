const db = require("../config/database");

const productController = {};

productController.getAll = (callback) => {
  const sqlString = "SELECT * FROM products";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

productController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM products WHERE productID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Product with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

productController.create = (productData, callback) => {
  const sqlString = "INSERT INTO products SET ?";
  db.query(sqlString, productData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { productID: result.insertId, ...productData });
  });
};

productController.update = (id, productData, callback) => {
  const sqlString = "UPDATE products SET ? WHERE productID = ?";
  db.query(sqlString, [productData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Product with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Product with ID ${id} updated successfully` });
  });
};

productController.delete = (id, callback) => {
  const sqlString = "DELETE FROM products WHERE productID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Product with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Product with ID ${id} deleted successfully` });
  });
};

module.exports = productController;
