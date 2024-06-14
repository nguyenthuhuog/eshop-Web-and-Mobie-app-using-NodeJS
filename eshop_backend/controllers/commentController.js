const db = require("../config/database");

const commentController = {};

commentController.getAll = (callback) => {
  const sqlString = "SELECT * FROM comments";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

commentController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM comments WHERE commentID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Comment with ID ${id} not found` }, null);
      return;
    }
    callback(null, results[0]);
  });
};
commentController.getByProductId = (id, callback) => {
  const sqlString = "SELECT * FROM comments WHERE productID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Comment with ID ${id} not found` }, null);
      return;
    }
    callback(null, results);
  });
};
commentController.create = (commentData, callback) => {
  const sqlString = "INSERT INTO comments SET ?";
  db.query(sqlString, commentData, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, { commentID: result.insertId, ...commentData });
  });
};

commentController.update = (id, commentData, callback) => {
  const sqlString = "UPDATE comments SET ? WHERE commentID = ?";
  db.query(sqlString, [commentData, id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Comment with ID ${id} not found` }, null);
      return;
    }
    callback(null, { message: `Comment with ID ${id} updated successfully` });
  });
};

commentController.delete = (id, callback) => {
  const sqlString = `DELETE FROM comments WHERE commentID = ${id}`;
  db.query(sqlString, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Comment with ID ${id} not found` }, null);
      return;
    }
    callback(null, { message: `Comment with ID ${id} deleted successfully` });
  });
};

module.exports = commentController;
