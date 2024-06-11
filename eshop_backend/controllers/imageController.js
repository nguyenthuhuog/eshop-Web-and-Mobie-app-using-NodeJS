const db = require("../config/database");

const imageController = {};

imageController.getAll = (callback) => {
  const sqlString = "SELECT * FROM images";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

imageController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM images WHERE imageID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Image with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

// Định nghĩa các hàm CRUD khác cho images tại đây

module.exports = imageController;
