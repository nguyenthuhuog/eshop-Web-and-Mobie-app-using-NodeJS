const db = require("../config/database");

const orderController = {};

orderController.getAll = (callback) => {
  const sqlString = "SELECT * FROM orders";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

orderController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM orders WHERE orderID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Order with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

orderController.create = (orderData, callback) => {
  const sqlString = "INSERT INTO orders SET ?";
  db.query(sqlString, orderData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { orderID: result.insertId, ...orderData });
  });
};

orderController.update = (id, orderData, callback) => {
  const sqlString = "UPDATE orders SET ? WHERE orderID = ?";
  db.query(sqlString, [orderData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Order with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Order with ID ${id} updated successfully` });
  });
};

orderController.delete = (id, callback) => {
  const sqlString = "DELETE FROM orders WHERE orderID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Order with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Order with ID ${id} deleted successfully` });
  });
};

module.exports = orderController;