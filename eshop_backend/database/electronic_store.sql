drop table if exists images;
drop table if exists orderDetails;
drop table if exists orders;
drop table if exists comments;
drop table if exists accounts;
drop table if exists products;
drop table if exists categories;
drop table if exists messages;

CREATE TABLE accounts (
    userID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    email VARCHAR(100),
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE categories (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(50) UNIQUE
);
CREATE TABLE products (
    productID INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(100),
    categoryID INT,
	description LONGTEXT,
    price DECIMAL(10, 2),
    stock INT,
    image_url VARCHAR(255),
    FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
);
CREATE TABLE images (
    imageID INT AUTO_INCREMENT PRIMARY KEY,
    productID INT,
    image_url VARCHAR(255),
    FOREIGN KEY (productID) REFERENCES products(productID)
);
CREATE TABLE comments (
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    rate DECIMAL(2,1) CHECK (rate IN (0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0)),
    content TEXT,
    productID INT,
    userID INT,
    FOREIGN KEY (productID) REFERENCES products(productID),
    FOREIGN KEY (userID) REFERENCES accounts(userID)
);
CREATE TABLE orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    orderDate DATE,
    totalAmount DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES accounts(userID)
);
CREATE TABLE orderDetails (
    orderDetailID INT AUTO_INCREMENT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT,
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);
CREATE TABLE messages (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    message LONGTEXT
);