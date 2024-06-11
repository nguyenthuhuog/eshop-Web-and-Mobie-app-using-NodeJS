const db = require("../config/database");

const categoryController = {};

categoryController.getAll = (callback) => {
  const sqlString = "SELECT * FROM categories";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

categoryController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM categories WHERE categoryID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Category with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

categoryController.insert = (categoryData, callback) => {
  const sqlString = "INSERT INTO categories SET ?";
  db.query(sqlString, categoryData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { categoryID: result.insertId, ...categoryData });
  });
};

categoryController.update = (id, categoryData, callback) => {
  const sqlString = "UPDATE categories SET ? WHERE categoryID = ?";
  db.query(sqlString, [categoryData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Category with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Category with ID ${id} updated successfully` });
  });
};

categoryController.delete = (id, callback) => {
  const sqlString = "DELETE FROM categories WHERE categoryID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Category with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Category with ID ${id} deleted successfully` });
  });
};

module.exports = categoryController;
