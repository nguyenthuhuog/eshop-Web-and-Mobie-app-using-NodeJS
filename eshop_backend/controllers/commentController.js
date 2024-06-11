const db = require("../config/database");

const commentController = {};

commentController.getAll = () => {
  return new Promise((resolve, reject) => {
    const sqlString = "SELECT * FROM comments";
    db.query(sqlString, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

commentController.getById = (id) => {
  return new Promise((resolve, reject) => {
    const sqlString = "SELECT * FROM comments WHERE commentID = ?";
    db.query(sqlString, id, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      if (results.length === 0) {
        reject({ message: `Comment with ID ${id} not found` });
        return;
      }
      resolve(results[0]);
    });
  });
};

commentController.create = (commentData) => {
  return new Promise((resolve, reject) => {
    const sqlString = "INSERT INTO comments SET ?";
    db.query(sqlString, commentData, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ commentID: result.insertId, ...commentData });
    });
  });
};

commentController.update = (id, commentData) => {
  return new Promise((resolve, reject) => {
    const sqlString = "UPDATE comments SET ? WHERE commentID = ?";
    db.query(sqlString, [commentData, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        reject({ message: `Comment with ID ${id} not found` });
        return;
      }
      resolve({ message: `Comment with ID ${id} updated successfully` });
    });
  });
};

commentController.delete = (id) => {
  return new Promise((resolve, reject) => {
    const sqlString = `DELETE FROM comments WHERE commentID = ${id}`;
    db.query(sqlString, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.affectedRows === 0) {
        reject({ message: `Comment with ID ${id} not found` });
        return;
      }
      resolve({ message: `Comment with ID ${id} deleted successfully` });
    });
  });
};

module.exports = commentController;
