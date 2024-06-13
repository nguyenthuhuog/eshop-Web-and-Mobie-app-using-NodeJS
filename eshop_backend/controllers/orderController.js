const db = require("../config/database");

const orderController = {};

orderController.createOrder = (userID, products, callback) => {
  db.beginTransaction((err) => {
    if (err) {
      callback(err);
      return;
    }

    const orderInsertQuery = `INSERT INTO orders (userID) VALUES (?)`;

    db.query(orderInsertQuery, [userID], (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const orderID = result.insertId;

      const orderDetailsInsertQuery = `
        INSERT INTO orderDetails (orderID, productID, quantity, price)
        VALUES ${products.map(p => `(?, ?, ?, ?)`).join(', ')}
      `;

      const orderDetailsData = [];
      products.forEach(product => {
        const productInfo = products.find(p => p.productID === product.productID);
        orderDetailsData.push(orderID, product.productID, product.quantity, productInfo.price);
      });

      db.query(orderDetailsInsertQuery, orderDetailsData, (err, result) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
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

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                callback(err);
              });
            }

            callback(null, { message: "Checkout successful and stock updated" });
          });
        });
      });
    });
  });
};

module.exports = orderController;
