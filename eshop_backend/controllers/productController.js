const db = require("../config/database");

const productController = {};

// Get all products
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

// Get product by ID
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

// Create a new product
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

// Update product by ID
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

// Delete product by ID
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

// Get products by category name
productController.getByCategoryName = (categoryName, callback) => {
  const sqlString = `
    SELECT * FROM products
    JOIN categories USING (categoryID)
    WHERE categoryName = ?`;
  db.query(sqlString, categoryName, (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

// Update stock quantities
productController.checkout = (userID, products, callback) => {
  db.beginTransaction((err) => {
    if (err) {
      callback(err);
      return;
    }

    const updateStockQuery = `
      UPDATE products
      SET stock = CASE
        ${products.map(product => `WHEN productID = ${product.productID} THEN stock - ${product.quantity}`).join(' ')}
      END
      WHERE productID IN (${products.map(product => product.productID).join(', ')});
    `;

    db.query(updateStockQuery, (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const clearCartQuery = "DELETE FROM cart WHERE userID = ?";

      db.query(clearCartQuery, [userID], (err, result) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          callback(null, { message: "Checkout successful and cart cleared" });
        });
      });
    });
  });
};

module.exports = productController;
