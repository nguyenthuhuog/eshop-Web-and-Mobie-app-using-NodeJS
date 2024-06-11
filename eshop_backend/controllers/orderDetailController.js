const db = require("../config/database");

const orderDetailController = {};

orderDetailController.getAll = (callback) => {
  const sqlString = "SELECT * FROM orderDetails";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

orderDetailController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM orderDetails WHERE orderDetailID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Order detail with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

orderDetailController.create = (orderDetailData, callback) => {
  const sqlString = "INSERT INTO orderDetails SET ?";
  db.query(sqlString, orderDetailData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { orderDetailID: result.insertId, ...orderDetailData });
  });
};

orderDetailController.update = (id, orderDetailData, callback) => {
  const sqlString = "UPDATE orderDetails SET ? WHERE orderDetailID = ?";
  db.query(sqlString, [orderDetailData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Order detail with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Order detail with ID ${id} updated successfully` });
  });
};

orderDetailController.delete = (id, callback) => {
  const sqlString = "DELETE FROM orderDetails WHERE orderDetailID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Order detail with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Order detail with ID ${id} deleted successfully` });
  });
};

module.exports = orderDetailController;
