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

imageController.create = (imageData, callback) => {
  const sqlString = "INSERT INTO images SET ?";
  db.query(sqlString, imageData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { imageID: result.insertId, ...imageData });
  });
};

imageController.update = (id, imageData, callback) => {
  const sqlString = "UPDATE images SET ? WHERE imageID = ?";
  db.query(sqlString, [imageData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Image with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Image with ID ${id} updated successfully` });
  });
};

imageController.delete = (id, callback) => {
  const sqlString = "DELETE FROM images WHERE imageID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Image with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Image with ID ${id} deleted successfully` });
  });
};

// Method to get images by productID
imageController.getByProductID = (productID, callback) => {
  const sqlString = "SELECT * FROM images WHERE productID = ?";
  db.query(sqlString, productID, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Images for productID ${productID} not found` });
      return;
    }
    callback(null, results);
  });
};

module.exports = imageController;
