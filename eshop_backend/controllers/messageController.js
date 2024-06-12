const db = require("../config/database");

const messageController = {};

// Lấy tất cả messages
messageController.getAll = (callback) => {
  const sqlString = "SELECT * FROM messages";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

// Lấy message theo ID
messageController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM messages WHERE messageID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Message with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

// Tạo mới message
messageController.create = (messageData, callback) => {
  const sqlString = "INSERT INTO messages SET ?";
  db.query(sqlString, messageData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { messageID: result.insertId, ...messageData });
  });
};

// Cập nhật message theo ID
messageController.update = (id, messageData, callback) => {
  const sqlString = "UPDATE messages SET ? WHERE messageID = ?";
  db.query(sqlString, [messageData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Message with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Message with ID ${id} updated successfully` });
  });
};

// Xóa message theo ID
messageController.delete = (id, callback) => {
  const sqlString = "DELETE FROM messages WHERE messageID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Message with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Message with ID ${id} deleted successfully` });
  });
};

module.exports = messageController;
