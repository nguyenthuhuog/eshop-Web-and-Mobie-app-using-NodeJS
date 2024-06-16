const db = require("../config/database");

const accountController = {};

accountController.getAll = (callback) => {
  const sqlString = "SELECT * FROM accounts";
  db.query(sqlString, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

accountController.getById = (id, callback) => {
  const sqlString = "SELECT * FROM accounts WHERE userID = ?";
  db.query(sqlString, id, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    if (results.length === 0) {
      callback({ message: `Account with ID ${id} not found` });
      return;
    }
    callback(null, results[0]);
  });
};

accountController.insert = (accountData, callback) => {
  const sqlString = "INSERT INTO accounts SET ?";
  db.query(sqlString, accountData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { userID: result.insertId, ...accountData });
  });
};

accountController.update = (id, accountData, callback) => {
  const sqlString = "UPDATE accounts SET ? WHERE userID = ?";
  db.query(sqlString, [accountData, id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Account with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Account with ID ${id} updated successfully` });
  });
};

accountController.delete = (id, callback) => {
  const sqlString = "DELETE FROM accounts WHERE userID = ?";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (result.affectedRows === 0) {
      callback({ message: `Account with ID ${id} not found` });
      return;
    }
    callback(null, { message: `Account with ID ${id} deleted successfully` });
  });
};

accountController.login = (username, password, callback) => {
  const sqlString = "SELECT * FROM accounts WHERE username = ? AND password = ?";
  db.query(sqlString, [username, password], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(new Error('Invalid username or password'));
    }
    callback(null, results[0]);
  });
};

module.exports = accountController;
